import { notFound } from "next/navigation";

// The root layout lives in a route group, so unmatched URLs only reach the site's not-found through here.
const MissingPage = () => notFound();

export default MissingPage;
