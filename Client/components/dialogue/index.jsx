import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function PoliticaTratamientoDatosModal({ isOpen, onClose }) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            {/* Modal Content */}
            <div className="relative bg-[#f7f3e8] max-w-4xl w-full mx-4 px-10 rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <section className="min-h-[30vh] flex items-center justify-center text-center px-4 ">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Política de Datos y Privacidad
                        </h1>
                        <p className="mt-4 text-gray-600 text-lg">
                            Transparencia en el tratamiento de datos personales, cumpliendo con la Ley 1581 de Colombia
                            y los requisitos para campañas publicitarias en Meta Ads.
                        </p>
                    </div>
                </section>

                <section className="py-2 px-4">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* 1. Nuestro Compromiso */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                                Nuestro Compromiso con tu Privacidad
                            </h2>
                            <p className="text-gray-700 text-justify leading-relaxed">
                                Nos tomamos muy en serio tu privacidad. Esta política describe cómo recolectamos, usamos
                                y protegemos la información personal que nos proporcionas cuando interactúas con nuestro
                                sitio web o campañas publicitarias. Cumplimos con la Ley 1581 de 2012 y las directrices
                                de Meta Ads para proteger tus datos.
                            </p>
                        </div>

                        {/* 2. Derechos del Usuario */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                                Derechos de los Usuarios
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                De acuerdo con la Ley 1581, tienes derecho a:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Acceder a tus datos personales almacenados por nosotros.</li>
                                <li>Solicitar correcciones o actualizaciones de tus datos.</li>
                                <li>Solicitar la eliminación de tu información.</li>
                                <li>Revocar el consentimiento previamente otorgado.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                Para ejercer estos derechos, contáctanos en{" "}
                                <a
                                    href="mailto:protecciondedatos@ourdomain.com"
                                    className="text-blue-600 underline"
                                >
                                    protecciondedatos@ourdomain.com
                                </a>.
                            </p>
                        </div>

                        {/* 3. Uso de Cookies */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                                Uso de Cookies y Seguimiento
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Utilizamos cookies y tecnologías de seguimiento para mejorar tu experiencia,
                                analizar el tráfico del sitio y mostrar publicidad personalizada, incluyendo
                                campañas de Meta Ads. No activaremos cookies de análisis o publicidad sin tu
                                consentimiento expreso.
                            </p>
                        </div>

                        {/* 4. Consentimiento en Formularios */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                                Consentimiento en Formularios
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Al enviar un formulario en nuestro sitio (por ejemplo, solicitudes de propiedades),
                                solicitamos tu consentimiento explícito para procesar tus datos personales. Deberás
                                marcar la casilla:
                                <span className="block italic mt-2 text-gray-800">
                                    “[ ] He leído y acepto la Política de Tratamiento de Datos Personales.”
                                </span>
                            </p>
                        </div>

                        {/* 5. Seguridad de la Información */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                                Seguridad de la Información
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Adoptamos medidas técnicas y organizativas para garantizar la seguridad de tus datos
                                personales y prevenir accesos no autorizados, alteraciones o pérdida de información.
                            </p>
                        </div>
                    </div>
                </section>

                {/* LAST UPDATE */}
                <section className="py-6 border-t border-gray-300">
                    <p className="text-center text-gray-500 text-sm">
                        Última actualización: {new Date().toLocaleDateString()}
                    </p>
                </section>
            </div>
        </Dialog>
    );
}
