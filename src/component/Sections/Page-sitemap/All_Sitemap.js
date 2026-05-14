import Link from "next/link";

const All_Sitemap = ({ initialValues }) => {
  return (
    <section className="">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:gap-7">
          <div className="mb-5">
            <h4 className="text-lg font-bold mb-3">Home page</h4>
            <ul className="text-lg text-dark-800">
              <li>
                <Link href="/">Home v1</Link>
              </li>
              <li>
                <Link href="home-2">Home v2</Link>
              </li>
              <li>
                <Link href="home-3">Home v3</Link>
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-lg font-bold mb-3">Booking pages</h4>
            <ul className="text-lg text-dark-800">
              <li>
                <Link href="hotels">Hotels</Link>
              </li>
              <li>
                <Link href="portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="tour">Tours</Link>
              </li>
              <li>
                <Link href="gallery">Gallery</Link>
              </li>
              <li>
                <Link href="testimonial">Testimonial</Link>
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-lg font-bold mb-3">Other pages</h4>
            <ul className="text-lg text-dark-800">
              <li>
                <Link href="404">404</Link>
              </li>
              <li>
                <Link href="about">About</Link>
              </li>
              <li>
                <Link href="booking-cart">Booking Cart</Link>
              </li>
              <li>
                <Link href="booking-contact">Booking Contact</Link>
              </li>
              <li>
                <Link href="booking-dashboard">Booking Dashboard</Link>
              </li>
              <li>
                <Link href="booking-detail">Booking Detail</Link>
              </li>
              <li>
                <Link href="booking-history">Booking History</Link>
              </li>
              <li>
                <Link href="booking-payment">Booking Payment</Link>
              </li>
              <li>
                <Link href="complete-or-thank-you">Complete Or Thank You</Link>
              </li>
              <li>
                <Link href="booking-cart">Booking Cart</Link>
              </li>
              <li>
                <Link href="blog-detail-1">Blog Detail 1</Link>
              </li>
              <li>
                <Link href="blog-detail-2">Blog Detail 2</Link>
              </li>
              <li>
                <Link href="blog-detail-3">Blog Detail 3</Link>
              </li>
              <li>
                <Link href="contact">Contact</Link>
              </li>
              <li>
                <Link href="destination">Destination</Link>
              </li>
              <li>
                <Link href="destination-detail">Destination Detail</Link>
              </li>
              <li>
                <Link href="destination-two">Destination Two</Link>
              </li>
              <li>
                <Link href="sitemap">Sitemap</Link>
              </li>
              <li>
                <Link href="forgot-password">Forgot Password</Link>
              </li>
              <li>
                <Link href="gallery">Gallery</Link>
              </li>
              <li>
                <Link href="gallery-masonry">Gallery Masonry</Link>
              </li>
              <li>
                <Link href="hotels">Hotels</Link>
              </li>
              <li>
                <Link href="hotels-detail">Hotels Detail</Link>
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-lg font-bold mb-3 hidden sm:block opacity-0">
              Other pages
            </h4>
            <ul className="text-lg text-dark-800">
              <li>
                <Link href="login">Login</Link>
              </li>
              <li>
                <Link href="portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="register">Register</Link>
              </li>
              <li>
                <Link href="reset-password">Reset Password</Link>
              </li>
              <li>
                <Link href="standard-blog">Standard Blog</Link>
              </li>
              <li>
                <Link href="team">Team</Link>
              </li>
              <li>
                <Link href="team-detail">Team Detail</Link>
              </li>
              <li>
                <Link href="testimonial">Testimonial</Link>
              </li>
              <li>
                <Link href="tour">Tour</Link>
              </li>
              <li>
                <Link href="tour-detail">Tour Detail</Link>
              </li>
              <li>
                <Link href="tour-detail-2">Tour Detail 2</Link>
              </li>
              <li>
                <Link href="tour-detail-3">Tour Detail 3</Link>
              </li>
              <li>
                <Link href="tour-grid">Tour Grid</Link>
              </li>
              <li>
                <Link href="tour-list">Tour List</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default All_Sitemap;
