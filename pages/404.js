import Head from "next/head";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Error_404 } from "@/component/Sections/Page-404";
import hero404Data from "../public/json/data/hero_404.json";
import error404DetailData from "../public/json/data/error_404_detail.json";
import siteMetaData from "../public/json/data/site_meta_link.json";

export default function Custom404() {
  const errorMeta = siteMetaData?.error_meta || {};

  return (
    <>
      <Head>
        <title>{errorMeta.title || "Page Not Found | Belet Travel"}</title>
        <meta
          name="description"
          content={
            errorMeta.description ||
            "The page you are looking for could not be found."
          }
        />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Comman_Hero initialValues={hero404Data} />
      <All_Error_404 initialValues={error404DetailData} />
    </>
  );
}