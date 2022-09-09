import React from "react";
import FooterList from "./FooterList";
import { footerList1, footerList2, footerList3 } from '../utils/constants';

function Footer() {

  return (
    <footer className="mt-6 hidden xl:block">
      <FooterList items={footerList1} mt={false} />
      <FooterList items={footerList2} mt />
      <FooterList items={footerList3} mt />
      <p className="text-gray-400 text-xs mt-5">© 2022 TikTik</p>
    </footer>
  );
}

export default Footer;
