import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone } from "lucide-react";
import whatsapp from "@/assets/whatsapp.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface Props {
  admin: {
    id: number;
    profile_image: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
}

const Form = ({ admin }: Props) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      return toast.error("Please fill all fields");
    }
    if (!formData.email.includes("@")) {
      return toast.error("Please enter a valid email address");
    }
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/send-email`,
        {
          ...formData,
          adminId: admin.id,
        }
      );
      toast.success("Email sent successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl p-10 transition duration-300">
      <div className="flex gap-2 mb-4">
        <Avatar>
          <AvatarImage
            src={admin.profile_image}
            className="bg-gray-200 object-contain"
          />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold">{admin.name}</h2>
          <a
            href={`mailto:${admin.email}`}
            className="mb-4 text-xs sm:text-sm inline-block"
          >
            {admin.email}
          </a>
          <div className="flex gap-5 whitespace-nowrap">
            <a
              href={`tel:${admin.phone.replace(/\s/g, "")}`}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <Phone size={24} strokeWidth={0.75} />
              <span>{t("call")}</span>
            </a>
            <a
              href={`https://wa.me/${admin.whatsapp.replace(/\s/g, "")}`}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <img src={whatsapp.src} alt="whatsapp" className="w-6" />
              <span>{t("chat")}</span>
            </a>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
        <Input
          type="text"
          placeholder={t("name")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-transparent border-black placeholder:text-primary"
        />
        <Input
          type="text"
          placeholder={t("email")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-transparent border-black placeholder:text-primary"
        />
        <Input
          type="text"
          placeholder={t("phone")}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-transparent border-black placeholder:text-primary"
        />
        <Textarea
          placeholder={t("message")}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="bg-transparent border-black placeholder:text-primary"
        />
        <Button
          disabled={loading}
          className="text-white bg-secondary rounded-xl mx-auto"
        >
          {loading ? t("sending") : t("contactAgent")}
        </Button>
      </form>
    </div>
  );
};

export default Form;
