"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import PhotosUploader from "@/components/Uploader";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/common/Loader";
import Delete from "@/components/Delete";
import { Admin } from "@/types";
import useAuthStore from "@/store/authStore";
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    backgroundColor: "#1f2937", // Dark mode background color
    color: "#ffffff", // Dark mode text color
    border: "1px solid #4b5563", // Border for dark mode
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState<number | null>();
  const [password, setPassword] = useState("");
  const { token } = useAuthStore();
  const { t } = useTranslation();

  const initialFormData: Admin = {
    id: null,
    profile_image: "",
    username: "",
    email: "",
    phone: "",
    whatsapp: "",
    created_at: "",
    updated_at: "",
  };

  const [formData, setFormData] = useState<Admin>(initialFormData);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(res.data.admins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditMode(false);
    setId(null);
    setFormData(initialFormData);
    setPassword(""); // Reset password field
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !formData.profile_image ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.whatsapp ||
      (!editMode && !password)
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      if (editMode && id !== null) {
        // Update admin
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/${id}`,
          {
            ...formData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success(
          "Admin updated successfully. Changes will be reflected after the next login.",
        );
      } else {
        // Add new admin
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/register`,
          {
            ...formData,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Admin added successfully");
      }

      closeModal();
      getAdmins();
    } catch (error) {
      if (error && (error as any).response?.status === 422) {
        toast.error("Email already exists");
        return;
      }
      toast.error("Failed to save admin");
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName={t("admins")} />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-start justify-between px-4 py-6 sm:flex-row sm:items-center md:px-6 xl:px-7.5">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white sm:mb-0">
              {t("allAdmins")}
            </h4>
            <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder={t("searchAdmins")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary sm:w-auto"
              />
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                {t("addAdmin")}
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={editMode ? t("editAdmin") : t("addAdmin")}
              >
                <div className="flex items-center justify-between px-4 py-4 md:px-6 xl:px-7.5">
                  <h4 className="text-xl font-semibold text-white dark:text-white">
                    {editMode ? t("editAdmin") : t("addAdmin")}
                  </h4>
                  <button
                    onClick={closeModal}
                    className="dark:text-white dark:hover:text-white"
                  >
                    <IoMdClose size={18} />
                  </button>
                </div>
                <form className="px-4 py-4 md:px-6 xl:px-7.5">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="profile_pic"
                        className="block text-sm font-medium text-white dark:text-white"
                      >
                        {t("profilePicture")}
                      </label>
                      <PhotosUploader
                        addedPhotos={
                          formData.profile_image ? [formData.profile_image] : []
                        }
                        maxPhotos={1}
                        onChange={(photos: any) =>
                          setFormData({ ...formData, profile_image: photos[0] })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white dark:text-white"
                      >
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white dark:text-white"
                      >
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white dark:text-white"
                      >
                        {t("phone")}
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-white dark:text-white"
                      >
                        {t("whatsapp")}
                      </label>
                      <input
                        type="text"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    {!editMode && (
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-white dark:text-white"
                        >
                          {t("password")}
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
                  >
                    {editMode ? t("editAdmin") : t("addAdmin")}
                  </button>
                </form>
              </Modal>
            </div>
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("profilePicture")}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("name")}
                </p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("email")}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("phone")}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  {t("whatsapp")}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <p className="font-medium text-black dark:text-white">
                  {t("actions")}
                </p>
              </div>
            </div>

            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="grid grid-cols-12 items-center border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                >
                  <div className="col-span-2 flex items-center">
                    <img
                      src={admin.profile_image}
                      alt={admin.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {admin.username}
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-black dark:text-white">
                      {admin.email}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {admin.phone}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {admin.whatsapp}
                    </p>
                  </div>

                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setFormData({
                          id: admin.id,
                          username: admin.username,
                          email: admin.email,
                          phone: admin.phone,
                          whatsapp: admin.whatsapp,
                          profile_image: admin.profile_image,
                          created_at: admin.created_at,
                          updated_at: admin.updated_at,
                        });
                        setPassword(""); // Reset the password field when editing
                        setEditMode(true);
                        setId(admin.id);
                        openModal();
                      }}
                      className="dark:text-white"
                    >
                      <FaEdit size={18} />
                    </button>
                    <Delete
                      api={`/admin/${admin.id}`}
                      message="Admin deleted successfully"
                      fetch={getAdmins}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noAdminsFound")}
              </div>
            )}
          </div>

          {/* Mobile Card Layout */}
          <div className="block px-4 sm:hidden">
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="mb-4 rounded-lg border border-stroke p-4 shadow-sm dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="mb-4 flex flex-col">
                    <img
                      src={admin.profile_image}
                      alt={admin.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mt-4">
                      <p className="text-sm text-black dark:text-white">
                        {admin.username}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("email")}: {admin.email}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("phone")}: {admin.phone}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {t("whatsapp")}:{admin.whatsapp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setFormData({
                            id: admin.id,
                            username: admin.username,
                            email: admin.email,
                            phone: admin.phone,
                            whatsapp: admin.whatsapp,
                            profile_image: admin.profile_image,
                            created_at: admin.created_at,
                            updated_at: admin.updated_at,
                          });
                          setPassword("");
                          setEditMode(true);
                          setId(admin.id);
                          openModal();
                        }}
                        className="dark:text-white"
                      >
                        <FaEdit size={18} />
                      </button>
                      <Delete
                        api={`/admin/${admin.id}`}
                        message="Admin deleted successfully"
                        fetch={getAdmins}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                {t("noAdminsFound")}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Admins;
