import React from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const TranslateButton = () => {
  const { i18n } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none ring-0">
        <Globe size={30} strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("es")}
          className="text-center flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 transition duration-200"
        >
          <img
            src="https://flagcdn.com/h60/es.png"
            alt="Spanish Flag"
            width="30"
          />
          <span>Spanish</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("en")}
          className="text-center flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 transition duration-200"
        >
          <img
            src="https://flagcdn.com/h60/us.png"
            alt="English Flag"
            width="30"
          />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TranslateButton;
