import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiBars3 } from "react-icons/hi2";
import Link from "next/link";
import { navLinks } from "@/constants";
import logo from "@/assets/logo.png";
import TranslateButton from "../TranslateButton";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger className="xl:hidden">
        <HiBars3 className="inline-block text-3xl hover:scale-125 transition duration-200" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-2xl font-bold text-center flex justify-between items-center mt-5">
          <img src={logo.src} alt="logo" className="w-28" />
          <TranslateButton />
        </SheetTitle>
        <div className="mt-20 flex flex-col gap-5 items-center justify-center text-lg">
          {navLinks.map(
            (link, index) => (
              // link.children ? (
              //   <Accordion key={index} type="single" collapsible>
              //     <AccordionItem value="item">
              //       <AccordionTrigger className="py-0 flex items-center pb-1 border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest">
              //         {link.title}
              //       </AccordionTrigger>
              //       <AccordionContent className="py-2 text-base tracking-wide text-center uppercase font-mons font-light border-none">
              //         <ul>
              //           <li>
              //             <Link href={link.url} className="inline-block py-2">
              //               <SheetClose>
              //                 {" "}
              //                 All {link.title.toLowerCase()}{" "}
              //               </SheetClose>
              //             </Link>
              //           </li>
              //           {link.children.map((child, index) => (
              //             <li key={index}>
              //               <Link href={child.url} className="inline-block py-2">
              //                 <SheetClose> {child.title} </SheetClose>
              //               </Link>
              //             </li>
              //           ))}
              //         </ul>
              //       </AccordionContent>
              //     </AccordionItem>
              //   </Accordion>
              // ) : (
              <Link
                href={link.url}
                key={index}
                className="flex items-center pb-1 border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
              >
                <SheetClose>{t(link.title)}</SheetClose>
              </Link>
            )
            // )
          )}
          <Link
            href="/contact"
            className="flex items-center pb-1 border-b border-transparent hover:border-gray-900 transition-all duration-300 font-mons tracking-widest"
          >
            <SheetClose>{t("contact")}</SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
