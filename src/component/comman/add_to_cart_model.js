import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";

const Add_To_Cart_Model = ({ Data }) => {
  const { addItem, items, updateItem } = useCart();
  const router = useRouter();

  const initialFormState = [{ title: "", fullName: "", age: "", phone: "" }];
  const initialErrorState = [{ title: "", fullName: "", age: "", phone: "" }];

  const [formCount, setFormCount] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    // Check if the item is already in the cart
    const cartItem = items.find(item => item.id === Data.id);

    if (cartItem) {
      setFormCount(cartItem.persons.length);
      setFormData(cartItem.persons);
      setErrors(cartItem.persons.map(() => ({ title: "", fullName: "", age: "", phone: "" })));
      setSelectedDate(cartItem.date);
    }
  }, [Data.id, items]);

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);

    // Clear errors on input change
    const newErrors = [...errors];
    newErrors[index][field] = "";
    setErrors(newErrors);
  };

  const handleAddForm = () => {
    setFormCount(prevCount => prevCount + 1);
    setFormData([...formData, { title: "", fullName: "", age: "", phone: "" }]);
    setErrors([...errors, { title: "", fullName: "", age: "", phone: "" }]);
  };

  const deleteForm = index => {
    setFormCount(prevCount => prevCount - 1);
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
    const newErrors = errors.filter((_, i) => i !== index);
    setErrors(newErrors);
  };

  const validateForm = () => {
    const position = ["mr", "Mr", "MR", "mrs", "Mrs", "MRs", "MRS"];
    const newErrors = formData.map(data => {
      const error = { title: "", fullName: "", age: "", phone: "" };
      if (!data.title.trim()) {
        error.title = "Position is required";
      } else if (!position.includes(data.title)) {
        error.title = "Position is invalid";
      }
      if (!data.fullName.trim()) error.fullName = "Full name is required";
      if (!data.age.trim()) error.age = "Age is required";
      else if (isNaN(data.age)) error.age = "Age must be a number";
      if (!data.phone.trim()) error.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(data.phone))
        error.phone = "Phone number must be 10 digits";
      return error;
    });

    setErrors(newErrors);

    // Validate date
    let dateValidationError = "";
    if (!selectedDate.trim()) {
      dateValidationError = "Date is required";
    }
    setDateError(dateValidationError);

    // Check if there are any errors
    return (
      newErrors.every(error => Object.values(error).every(msg => !msg)) &&
      !dateValidationError
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      const finalData = {
        ...Data,
        one_price: Data.price,
        price: Data.price * formCount,
        persons: formData,
        date: selectedDate,
      };

      const cartItem = items.find(item => item.id === Data.id);

      if (!cartItem) {
        addItem(finalData);
      } else {
        updateItem(cartItem.id, finalData);
      }

      router.push("/booking-cart");
    }
  };

  const singleForm = index => {
    return (
      <div
        data-repeater-item
        className="flex flex-wrap md:flex-nowrap gap-x-4 w-full"
        key={index}>
        <div className="w-[63px] shrink-0 mb-4">
          <input
            type="text"
            placeholder="Mr."
            className="form-control bg-gray-200 border border-primary-800 py-2 px-5 w-full text-dark-800 text-md rounded-[3px]"
            value={formData[index].title}
            onChange={e => handleInputChange(index, "title", e.target.value)}
          />
          {errors[index]?.title && (
            <span className="error text-red-800">{errors[index].title}</span>
          )}
        </div>
        <div className="w-[calc(100%-79px)] md:w-full mb-4">
          <input
            type="text"
            placeholder="Enter full name"
            className="form-control bg-gray-200 border border-primary-800 py-2 px-5 w-full text-dark-800 text-md rounded-[3px]"
            value={formData[index].fullName}
            onChange={e => handleInputChange(index, "fullName", e.target.value)}
          />
          {errors[index]?.fullName && (
            <span className="error text-red-800">{errors[index].fullName}</span>
          )}
        </div>
        <div className="w-[73px] shrink-0 mb-4">
          <input
            type="text"
            placeholder="Age"
            className="form-control bg-gray-200 border border-primary-800 py-2 px-5 w-full text-dark-800 text-md rounded-[3px]"
            value={formData[index].age}
            onChange={e => handleInputChange(index, "age", e.target.value)}
          />
          {errors[index]?.age && (
            <span className="error text-red-800">{errors[index].age}</span>
          )}
        </div>
        <div className="w-[calc(100%-149px)] md:w-[193px] shrink-0 mb-4">
          <input
            type="text"
            placeholder="Phone"
            className="form-control bg-gray-200 border border-primary-800 py-2 px-5 w-full text-dark-800 text-md rounded-[3px]"
            value={formData[index].phone}
            onChange={e => handleInputChange(index, "phone", e.target.value)}
          />
          {errors[index]?.phone && (
            <span className="error text-red-800">{errors[index].phone}</span>
          )}
        </div>
        {index !== 0 && (
          <div
            onClick={() => deleteForm(index)}
            className="w-[44px] shrink-0 mb-4">
            <button
              type="button"
              className="plus-btn bg-gray-200 border border-primary-800 py-2 w-full text-dark-900 leading-[20px] h-full flex items-center justify-center text-1xl font-bold rounded-[3px] hover:bg-primary-900 hover:text-white">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderForms = () => {
    return formData.map((_, index) => singleForm(index));
  };

  return (
    <div className="pt-6 pb-9 px-5">
      <div className="sm:flex justify-between mb-6 sm:mb-8">
        <div>
          <h3 className="text-xl mb-2">{Data.title}</h3>
          <span className="text-md mb-3 sm:mb-0">
            {Data.short_des} - {Data.day} days {Data.day + 1} nights.
          </span>
        </div>
        <div className="text-xl text-primary-900 font-bold">${Data.price}</div>
      </div>
      <div>
        <form className="repeater" onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:flex-nowrap gap-x-4">
            <div
              data-repeater-list="category-group"
              className="flex flex-wrap gap-x-4 w-full">
              {renderForms()}
            </div>
            <div className="w-[44px] shrink-0 mb-4">
              <button
                onClick={handleAddForm}
                type="button"
                className="plus-btn bg-gray-200 border border-primary-800 py-2 w-full text-dark-900 leading-[20px] h-full flex items-center justify-center text-[28px] font-bold rounded-[3px] hover:bg-primary-900 hover:text-white">
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <div className="w-full">
              <input
                type="date"
                placeholder="Select date"
                className="form-control bg-gray-200 border border-primary-800 py-2 px-5 w-full text-dark-800 text-md rounded-[3px]"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
              {dateError && (
                <span className="error text-red-800">{dateError}</span>
              )}
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2 h-full max-w-full rounded-[3px] w-full py-2">
                Add to cart
                <Image
                  src="/assets/images/material-symbols_card-travel.svg"
                  alt="material-symbols_card-travel"
                  width={22}
                  height={22}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_To_Cart_Model;
