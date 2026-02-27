import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAMOUS_PLACES } from './data/destinations';
import type { Destination } from './data/destinations';
import { notificationService } from './services/notificationService';
import { 
  Plane, 
  Search, 
  User as UserIcon, 
  History, 
  Bell, 
  Map as MapIcon, 
  ChevronRight, 
  ArrowLeft, 
  CreditCard, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  LogOut,
  Settings,
  Filter,
  Globe,
  Cloud,
  Facebook,
  Chrome,
  Apple,
  QrCode,
  Info,
  Armchair,
  Star,
  Camera,
  Trash2,
  Shield,
  Languages,
  Coins,
  Ruler,
  Moon,
  Sun,
  FileText,
  Plus,
  ExternalLink,
  Eye,
  EyeOff,
  Check,
  Download,
  Hotel,
  Heart
} from 'lucide-react';
import { User, Flight, Booking, Screen, AppNotification } from './types';

// --- Translations ---

const translations: any = {
  English: {
    search: "Search",
    trips: "Trips",
    alerts: "Alerts",
    profile: "Profile",
    popular: "Popular Destinations",
    seeAll: "See all",
    bookNow: "Book Now",
    from: "From",
    to: "To",
    date: "Date",
    passengers: "Passengers",
    class: "Class",
    findFlights: "Find Flights",
    recentAlerts: "Recent Alerts",
    noAlerts: "No alerts yet",
    myTrips: "My Trips",
    upcomingPast: "Upcoming and past flights",
    noBookings: "No bookings found yet",
    personalInfo: "Personal Information",
    paymentMethods: "Payment Methods",
    notifications: "Notifications",
    settings: "Settings",
    travelDocs: "Travel Documents",
    premium: "FlyBook Premium",
    logout: "Log Out",
    deleteAccount: "Delete Account",
    language: "Language",
    currency: "Currency",
    appearance: "Appearance",
    privacySettings: "Privacy Settings",
    helpSupport: "Help & Support",
    termsOfService: "Terms of Service",
    bright: "Bright",
    dark: "Dark",
    profileVisibility: "Profile Visibility",
    dataSharing: "Data Sharing",
    locationTracking: "Location Tracking",
    faq: "Frequently Asked Questions",
    troubleshooting: "Troubleshooting Guides",
    ticketTracking: "Ticket / Case Tracking",
    needHelp: "Need more help?",
    chatWithUs: "Chat with us",
    emailSupport: "Email Support",
    savedMethods: "Saved Methods",
    addCard: "Add Card",
    connectStripe: "Connect with Stripe",
    faq1_q: 'How do I cancel a booking?',
    faq1_a: "Go to 'Trips', select your flight, and tap 'Cancel Booking'.",
    faq2_q: 'What payment methods are accepted?',
    faq2_a: 'We accept all major credit cards, PayPal, and Stripe.',
    faq3_q: 'Can I change my flight date?',
    faq3_a: 'Yes, but fees may apply depending on the airline policy.',
    ts1_q: 'App is crashing on startup',
    ts1_a: 'Try clearing your browser cache or updating your browser to the latest version.',
    ts2_q: 'Flight search is not returning results',
    ts2_a: 'Ensure you have a stable internet connection and that the cities entered are correct.',
    tt1_q: 'Active Support Tickets',
    tt1_a: 'No active support tickets found for your account.',
    boardingPasses: 'Boarding Passes',
    passports: 'Passports & IDs',
    hotelVouchers: 'Hotel Vouchers',
    insurance: 'Travel Insurance',
    recentDocuments: 'Recent Documents',
    addNew: 'Add New',
    noDocuments: 'No documents yet',
    backToDocuments: 'Back to Documents',
    uploadedDocuments: 'Uploaded Documents',
    upload: 'Upload',
    fullName: "Full Name",
    dob: "Date of Birth",
    nationality: "Nationality",
    passportNumber: "Passport / ID Number",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    saveChanges: "Save Changes",
    saved: "Saved",
    changeProfilePicture: "Change Profile Picture",
    sensitiveInfoNote: "Your sensitive information is encrypted and securely stored. We use this data only for booking confirmations and travel requirements.",
    bookingConfirmations: "Booking Confirmations",
    bookingConfirmationsDesc: "Get notified when your flight is confirmed.",
    flightReminders: "Flight Reminders",
    flightRemindersDesc: "Reminders about check-in and boarding times.",
    promotionalOffers: "Promotional Offers",
    promotionalOffersDesc: "Exclusive discounts and travel deals.",
    travelAlerts: "Travel Alerts",
    travelAlertsDesc: "Delays, weather warnings, and safety notices.",
    logoutConfirm: "Are you sure you want to log out?",
    deleteConfirm: "WARNING: This action is permanent. Are you sure you want to delete your account and all your data?",
    deleteRequest: "Account deletion request submitted. Your data will be removed within 24 hours.",
    supportTeamDesc: "Our support team is available 24/7 to assist you.",
    activityLogs: "Account Activity Logs",
    dataExport: "Data Download / Export",
    gdprNote: "FlyBook complies with GDPR and CCPA standards to protect your personal information.",
    privacyNote: "Note",
    travelAlertsNote: "We recommend keeping Travel Alerts enabled to receive real-time updates about your trips.",
    selectSeat: "Select Your Seat",
    available: "Available",
    occupied: "Occupied",
    selected: "Selected",
    extras: "Extras",
    baggage: "Baggage",
    payment: "Payment",
    summary: "Summary",
    flightTicket: "Flight Ticket",
    taxesFees: "Taxes & Fees",
    totalAmount: "Total Amount",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    applePay: "Apple Pay",
    googlePay: "Google Pay",
    payWithStripe: "Pay with Stripe",
    confirmPaymentBook: "Confirm Payment & Book",
    bookingConfirmed: "Booking Confirmed!",
    bookingSuccessMsg: "Your flight has been booked successfully. Show this QR code at the gate.",
    bookingRef: "Booking Reference",
    viewMyTrips: "View My Trips",
    addToCalendar: "Add to Calendar",
    shareTicket: "Share Ticket",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue",
    joinFlyBook: "Join FlyBook",
    forgotPassword: "Forgot Password?",
    signIn: "Sign In",
    createAccount: "Create Account",
    orContinueWith: "Or continue with",
    noAccount: "Don't have an account? Sign Up",
    alreadyAccount: "Already have an account? Sign In",
    cancelFlight: "Cancel Flight",
    viewTicket: "View Ticket",
    confirmed: "Confirmed",
    seat: "Seat",
    paymentInitiatedMsg: "Payment window opened. Please complete the payment in the new tab and then confirm below.",
    paymentRedirectMsg: "You will be redirected to our secure Stripe checkout to complete your payment.",
    flightDetails: "Flight Details",
    bookSeat: "Book Seat",
    email: "Email Address",
    password: "Password",
    seamlessTravel: "Seamless travel starts here",
    cheapest: "Cheapest",
    fastest: "Fastest",
    earliest: "Earliest",
    availableFlights: "Available Flights",
    flightsFound: "flights found",
    economy: "Economy",
    business: "Business",
    first: "First",
    selectOriginDest: "Please select both origin and destination"
  },
  Spanish: {
    search: "Buscar",
    trips: "Viajes",
    alerts: "Alertas",
    profile: "Perfil",
    popular: "Destinos Populares",
    seeAll: "Ver todo",
    bookNow: "Reservar ahora",
    from: "Desde",
    to: "Hacia",
    date: "Fecha",
    passengers: "Pasajeros",
    class: "Clase",
    findFlights: "Buscar Vuelos",
    recentAlerts: "Alertas Recientes",
    noAlerts: "No hay alertas",
    myTrips: "Mis Viajes",
    upcomingPast: "Vuelos próximos y pasados",
    noBookings: "No se encontraron reservas",
    personalInfo: "Información Personal",
    paymentMethods: "Métodos de Pago",
    notifications: "Notificaciones",
    settings: "Ajustes",
    travelDocs: "Documentos de Viaje",
    premium: "FlyBook Premium",
    logout: "Cerrar Sesión",
    deleteAccount: "Eliminar Cuenta",
    language: "Idioma",
    currency: "Moneda",
    appearance: "Apariencia",
    privacySettings: "Ajustes de Privacidad",
    helpSupport: "Ayuda y Soporte",
    termsOfService: "Términos de Servicio",
    bright: "Claro",
    dark: "Oscuro",
    profileVisibility: "Visibilidad del Perfil",
    dataSharing: "Compartir Datos",
    locationTracking: "Rastreo de Ubicación",
    faq: "Preguntas Frecuentes",
    troubleshooting: "Guías de Solución",
    ticketTracking: "Seguimiento de Tickets",
    needHelp: "¿Necesitas más ayuda?",
    chatWithUs: "Chatea con nosotros",
    emailSupport: "Soporte por Email",
    savedMethods: "Métodos Guardados",
    addCard: "Añadir Tarjeta",
    connectStripe: "Conectar con Stripe",
    boardingPasses: "Pases de Abordar",
    passports: "Pasaportes e IDs",
    hotelVouchers: "Cupones de Hotel",
    insurance: "Seguro de Viaje",
    recentDocuments: "Documentos Recientes",
    addNew: "Añadir Nuevo",
    noDocuments: "Aún no hay documentos",
    backToDocuments: "Volver a Documentos",
    uploadedDocuments: "Documentos Subidos",
    upload: "Subir",
    fullName: "Nombre Completo",
    dob: "Fecha de Nacimiento",
    nationality: "Nacionalidad",
    passportNumber: "Número de Pasaporte / ID",
    emailAddress: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    saveChanges: "Guardar Cambios",
    saved: "Guardado",
    changeProfilePicture: "Cambiar Foto de Perfil",
    sensitiveInfoNote: "Su información sensible está encriptada y almacenada de forma segura. Usamos estos datos solo para confirmaciones de reserva y requisitos de viaje.",
    bookingConfirmations: "Confirmaciones de Reserva",
    bookingConfirmationsDesc: "Recibe notificaciones cuando se confirme tu vuelo.",
    flightReminders: "Recordatorios de Vuelo",
    flightRemindersDesc: "Recordatorios sobre el check-in y horarios de abordaje.",
    promotionalOffers: "Ofertas Promocionales",
    promotionalOffersDesc: "Descuentos exclusivos y ofertas de viaje.",
    travelAlerts: "Alertas de Viaje",
    travelAlertsDesc: "Retrasos, advertencias climáticas y avisos de seguridad.",
    logoutConfirm: "¿Estás seguro de que quieres cerrar sesión?",
    deleteConfirm: "ADVERTENCIA: Esta acción es permanente. ¿Estás seguro de que quieres eliminar tu cuenta y todos tus datos?",
    deleteRequest: "Solicitud de eliminación de cuenta enviada. Tus datos serán eliminados en 24 horas.",
    supportTeamDesc: "Nuestro equipo de soporte está disponible 24/7 para ayudarte.",
    activityLogs: "Registros de Actividad de la Cuenta",
    dataExport: "Descarga / Exportación de Datos",
    gdprNote: "FlyBook cumple con los estándares GDPR y CCPA para proteger su información personal.",
    privacyNote: "Nota",
    travelAlertsNote: "Recomendamos mantener habilitadas las Alertas de Viaje para recibir actualizaciones en tiempo real sobre sus viajes.",
    selectSeat: "Selecciona tu asiento",
    available: "Disponible",
    occupied: "Ocupado",
    selected: "Seleccionado",
    extras: "Extras",
    baggage: "Equipaje",
    payment: "Pago",
    summary: "Resumen",
    flightTicket: "Boleto de avión",
    taxesFees: "Impuestos y tasas",
    totalAmount: "Monto total",
    paymentMethod: "Método de pago",
    creditCard: "Tarjeta de crédito",
    applePay: "Apple Pay",
    googlePay: "Google Pay",
    payWithStripe: "Pagar con Stripe",
    confirmPaymentBook: "Confirmar pago y reservar",
    bookingConfirmed: "¡Reserva confirmada!",
    bookingSuccessMsg: "Tu vuelo ha sido reservado con éxito. Muestra este código QR en la puerta.",
    bookingRef: "Referencia de reserva",
    viewMyTrips: "Ver mis viajes",
    addToCalendar: "Añadir al calendario",
    shareTicket: "Compartir boleto",
    welcomeBack: "Bienvenido de nuevo",
    signInToContinue: "Inicia sesión para continuar",
    joinFlyBook: "Únete a FlyBook",
    forgotPassword: "¿Olvidaste tu contraseña?",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    orContinueWith: "O continuar con",
    noAccount: "¿No tienes una cuenta? Regístrate",
    alreadyAccount: "¿Ya tienes una cuenta? Inicia sesión",
    cancelFlight: "Cancelar vuelo",
    viewTicket: "Ver boleto",
    confirmed: "Confirmado",
    seat: "Asiento",
    paymentInitiatedMsg: "Ventana de pago abierta. Complete el pago en la nueva pestaña y luego confirme a continuación.",
    paymentRedirectMsg: "Será redirigido a nuestro pago seguro de Stripe para completar su pago.",
    flightDetails: "Detalles del vuelo",
    bookSeat: "Reservar asiento",
    seamlessTravel: "El viaje sin interrupciones comienza aquí",
    cheapest: "Más barato",
    fastest: "Más rápido",
    earliest: "Más temprano",
    availableFlights: "Vuelos disponibles",
    flightsFound: "vuelos encontrados",
    economy: "Económica",
    business: "Ejecutiva",
    first: "Primera",
    selectOriginDest: "Por favor seleccione origen y destino"
  },
  Amharic: {
    search: "ፈልግ",
    trips: "ጉዞዎች",
    alerts: "ማሳሰቢያዎች",
    profile: "መገለጫ",
    popular: "ታዋቂ ቦታዎች",
    seeAll: "ሁሉንም እይ",
    bookNow: "አሁኑኑ ያዝ",
    from: "መነሻ",
    to: "መድረሻ",
    date: "ቀን",
    passengers: "ተጓዦች",
    class: "ደረጃ",
    findFlights: "በረራዎችን ፈልግ",
    recentAlerts: "የቅርብ ጊዜ ማሳሰቢያዎች",
    noAlerts: "ምንም ማሳሰቢያ የለም",
    myTrips: "የእኔ ጉዞዎች",
    upcomingPast: "የሚመጡ እና ያለፉ በረራዎች",
    noBookings: "ምንም የተያዘ በረራ የለም",
    personalInfo: "የግል መረጃ",
    paymentMethods: "የክፍያ መንገዶች",
    notifications: "ማሳሰቢያዎች",
    settings: "ቅንብሮች",
    travelDocs: "የጉዞ ሰነዶች",
    premium: "FlyBook ፕሪሚየም",
    logout: "ውጣ",
    deleteAccount: "መለያ አጥፋ",
    language: "ቋንቋ",
    currency: "ገንዘብ",
    appearance: "ገጽታ",
    privacySettings: "የግላዊነት ቅንብሮች",
    helpSupport: "እርዳታ እና ድጋፍ",
    termsOfService: "የአጠቃቀም ደንቦች",
    bright: "ብሩህ",
    dark: "ጨለማ",
    profileVisibility: "የመገለጫ ታይነት",
    dataSharing: "መረጃ ማጋራት",
    locationTracking: "አካባቢን መከታተል",
    faq: "ተደጋጋሚ ጥያቄዎች",
    troubleshooting: "የችግር መፍቻ መመሪያዎች",
    ticketTracking: "የቲኬት ክትትል",
    needHelp: "ተጨማሪ እርዳታ ይፈልጋሉ?",
    chatWithUs: "ከእኛ ጋር ይወያዩ",
    emailSupport: "በኢሜል ይጠይቁ",
    savedMethods: "የተቀመጡ መንገዶች",
    addCard: "ካርድ ጨምር",
    connectStripe: "ከStripe ጋር አገናኝ",
    boardingPasses: "የመሳፈሪያ ፓስ",
    passports: "ፓስፖርት እና መታወቂያ",
    hotelVouchers: "የሆቴል ቫውቸር",
    insurance: "የጉዞ ኢንሹራንስ",
    recentDocuments: "የቅርብ ጊዜ ሰነዶች",
    addNew: "አዲስ ጨምር",
    noDocuments: "ምንም ሰነድ የለም",
    backToDocuments: "ወደ ሰነዶች ተመለስ",
    uploadedDocuments: "የተጫኑ ሰነዶች",
    upload: "ጫን",
    fullName: "ሙሉ ስም",
    dob: "የትውልድ ቀን",
    nationality: "ዜግነት",
    passportNumber: "የፓስፖርት / መታወቂያ ቁጥር",
    emailAddress: "ኢሜል አድራሻ",
    phoneNumber: "ስልክ ቁጥር",
    saveChanges: "ለውጦችን አስቀምጥ",
    saved: "ተቀምጧል",
    changeProfilePicture: "የመገለጫ ምስል ቀይር",
    sensitiveInfoNote: "የእርስዎ ሚስጥራዊ መረጃ ተመስጥሮ እና በደህንነት ተቀምጧል። ይህንን መረጃ ለቦታ ማስያዣ ማረጋገጫዎች እና ለጉዞ መስፈርቶች ብቻ እንጠቀማለን።",
    bookingConfirmations: "የቦታ ማስያዣ ማረጋገጫዎች",
    bookingConfirmationsDesc: "በረራዎ ሲረጋገጥ ማሳሰቢያ ይደርስዎታል።",
    flightReminders: "የበረራ ማሳሰቢያዎች",
    flightRemindersDesc: "ስለ ቼክ-ኢን እና የመሳፈሪያ ሰዓቶች ማሳሰቢያዎች።",
    promotionalOffers: "የማስተዋወቂያ ቅናሾች",
    promotionalOffersDesc: "ልዩ ቅናሾች እና የጉዞ ስምምነቶች።",
    travelAlerts: "የጉዞ ማሳሰቢያዎች",
    travelAlertsDesc: "መዘግየቶች፣ የአየር ሁኔታ ማስጠንቀቂያዎች እና የደህንነት ማሳሰቢያዎች።",
    logoutConfirm: "በእርግጠኝነት መውጣት ይፈልጋሉ?",
    deleteConfirm: "ማስጠንቀቂያ፡ ይህ ድርጊት ቋሚ ነው። መለያዎን እና ሁሉንም መረጃዎን ማጥፋት እንደሚፈልጉ እርግጠኛ ነዎት?",
    deleteRequest: "የመለያ ማጥፋት ጥያቄ ቀርቧል። መረጃዎ በ24 ሰዓታት ውስጥ ይጠፋል።",
    supportTeamDesc: "የድጋፍ ቡድናችን እርስዎን ለመርዳት በቀን 24 ሰዓት በሳምንት 7 ቀን ይገኛል።",
    activityLogs: "የመለያ እንቅስቃሴ ምዝግብ ማስታወሻዎች",
    dataExport: "መረጃን ማውረድ / መላክ",
    gdprNote: "FlyBook የእርስዎን የግል መረጃ ለመጠበቅ ከGDPR እና CCPA ደረጃዎች ጋር ይጣጣማል።",
    privacyNote: "ማስታወሻ",
    travelAlertsNote: "ስለ ጉዞዎችዎ የእውነተኛ ጊዜ ዝመናዎችን ለማግኘት የጉዞ ማሳሰቢያዎችን እንዲያበሩ እንመክራለን።",
    selectSeat: "ወንበርዎን ይምረጡ",
    available: "ክፍት",
    occupied: "የተያዘ",
    selected: "የተመረጠ",
    extras: "ተጨማሪዎች",
    baggage: "ሻንጣ",
    payment: "ክፍያ",
    summary: "ማጠቃለያ",
    flightTicket: "የበረራ ቲኬት",
    taxesFees: "ታክስ እና ክፍያዎች",
    totalAmount: "ጠቅላላ መጠን",
    paymentMethod: "የክፍያ መንገድ",
    creditCard: "ክሬዲት ካርድ",
    applePay: "Apple Pay",
    googlePay: "Google Pay",
    payWithStripe: "በStripe ይክፈሉ",
    confirmPaymentBook: "ክፍያውን ያረጋግጡ እና ይያዙ",
    bookingConfirmed: "ቦታ ተይዟል!",
    bookingSuccessMsg: "በረራዎ በተሳካ ሁኔታ ተይዟል። ይህንን የQR ኮድ በመግቢያው ላይ ያሳዩ።",
    bookingRef: "የቦታ ማስያዣ ማጣቀሻ",
    viewMyTrips: "የእኔን ጉዞዎች እይ",
    addToCalendar: "ወደ ካላንደር ጨምር",
    shareTicket: "ቲኬት አጋራ",
    welcomeBack: "እንኳን ደህና መጡ",
    signInToContinue: "ለመቀጠል ይግቡ",
    joinFlyBook: "FlyBookን ይቀላቀሉ",
    forgotPassword: "የይለፍ ቃል ረስተዋል?",
    signIn: "ግባ",
    createAccount: "መለያ ፍጠር",
    orContinueWith: "ወይም በዚህ ይቀጥሉ",
    noAccount: "መለያ የለዎትም? ይመዝገቡ",
    alreadyAccount: "ቀድሞውኑ መለያ አለዎት? ይግቡ",
    cancelFlight: "በረራ ሰርዝ",
    viewTicket: "ቲኬት እይ",
    confirmed: "ተረጋግጧል",
    seat: "ወንበር",
    paymentInitiatedMsg: "የክፍያ መስኮት ተከፍቷል። እባክዎን ክፍያውን በአዲሱ ትር ውስጥ ያጠናቅቁ እና ከዚያ በታች ያረጋግጡ።",
    paymentRedirectMsg: "ክፍያዎን ለማጠናቀቅ ወደ የእኛ ደህንነቱ የተጠበቀ የStripe ክፍያ ይዛወራሉ።",
    flightDetails: "የበረራ ዝርዝሮች",
    bookSeat: "ወንበር ያዝ",
    seamlessTravel: "እንከን የለሽ ጉዞ እዚህ ይጀምራል",
    cheapest: "ርካሽ",
    fastest: "ፈጣን",
    earliest: "ቀደምት",
    availableFlights: "የሚገኙ በረራዎች",
    flightsFound: "በረራዎች ተገኝተዋል",
    economy: "ኢኮኖሚ",
    business: "ቢዝነስ",
    first: "ፈርስት ክላስ",
    selectOriginDest: "እባክዎን መነሻ እና መድረሻ ይምረጡ"
  },
  French: {
    search: "Rechercher",
    trips: "Voyages",
    alerts: "Alertes",
    profile: "Profil",
    popular: "Destinations Populaires",
    seeAll: "Voir tout",
    bookNow: "Réserver maintenant",
    from: "De",
    to: "À",
    date: "Date",
    passengers: "Passagers",
    class: "Classe",
    findFlights: "Trouver des vols",
    recentAlerts: "Alertes Récentes",
    noAlerts: "Aucune alerte",
    myTrips: "Mes Voyages",
    upcomingPast: "Vols à venir et passés",
    noBookings: "Aucune réservation trouvée",
    personalInfo: "Informations Personnelles",
    paymentMethods: "Méthodes de Paiement",
    notifications: "Notifications",
    settings: "Paramètres",
    travelDocs: "Documents de Voyage",
    premium: "FlyBook Premium",
    logout: "Déconnexion",
    deleteAccount: "Supprimer le compte",
    language: "Langue",
    currency: "Devise",
    appearance: "Apparence",
    privacySettings: "Paramètres de Confidentialité",
    helpSupport: "Aide et Support",
    termsOfService: "Conditions d'Utilisation",
    bright: "Clair",
    dark: "Sombre",
    profileVisibility: "Visibilité du Profil",
    dataSharing: "Partage de Données",
    locationTracking: "Suivi de Localisation",
    faq: "Questions Fréquentes",
    troubleshooting: "Guides de Dépannage",
    ticketTracking: "Suivi des Tickets",
    needHelp: "Besoin d'aide ?",
    chatWithUs: "Discuter avec nous",
    emailSupport: "Support par Email",
    savedMethods: "Méthodes Enregistrées",
    addCard: "Ajouter une Carte",
    connectStripe: "Connecter avec Stripe",
    boardingPasses: "Cartes d'Embarquement",
    passports: "Passeports & IDs",
    hotelVouchers: "Bons d'Hôtel",
    insurance: "Assurance Voyage",
    recentDocuments: "Documents Récents",
    addNew: "Ajouter Nouveau",
    noDocuments: "Aucun document pour l'instant",
    backToDocuments: "Retour aux Documents",
    uploadedDocuments: "Documents Téléchargés",
    upload: "Télécharger",
    fullName: "Nom Complet",
    dob: "Date de Naissance",
    nationality: "Nationalité",
    passportNumber: "Numéro de Passeport / ID",
    emailAddress: "Adresse Email",
    phoneNumber: "Numéro de Téléphone",
    saveChanges: "Enregistrer les Modifications",
    saved: "Enregistré",
    changeProfilePicture: "Changer la Photo de Profil",
    sensitiveInfoNote: "Vos informations sensibles sont cryptées et stockées en toute sécurité. Nous utilisons ces données uniquement pour les confirmations de réservation et les exigences de voyage.",
    bookingConfirmations: "Confirmations de Réservation",
    bookingConfirmationsDesc: "Soyez notifié lorsque votre vol est confirmé.",
    flightReminders: "Rappels de Vol",
    flightRemindersDesc: "Rappels sur l'enregistrement et les heures d'embarquement.",
    promotionalOffers: "Offres Promotionnelles",
    promotionalOffersDesc: "Remises exclusives et bons plans voyage.",
    travelAlerts: "Alertes Voyage",
    travelAlertsDesc: "Retards, avertissements météo et avis de sécurité.",
    logoutConfirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
    deleteConfirm: "AVERTISSEMENT : Cette action est permanente. Êtes-vous sûr de vouloir supprimer votre compte et toutes vos données ?",
    deleteRequest: "Demande de suppression de compte soumise. Vos données seront supprimées dans les 24 heures.",
    supportTeamDesc: "Notre équipe d'assistance est disponible 24/7 pour vous aider.",
    activityLogs: "Journaux d'Activité du Compte",
    dataExport: "Téléchargement / Exportation de Données",
    gdprNote: "FlyBook respecte les normes GDPR et CCPA pour protéger vos informations personnelles.",
    privacyNote: "Note",
    travelAlertsNote: "Nous vous recommandons de garder les alertes de voyage activées pour recevoir des mises à jour en temps réel sur vos voyages.",
    selectSeat: "Sélectionnez votre siège",
    available: "Disponible",
    occupied: "Occupé",
    selected: "Sélectionné",
    extras: "Extras",
    baggage: "Bagages",
    payment: "Paiement",
    summary: "Résumé",
    flightTicket: "Billet d'avion",
    taxesFees: "Taxes et frais",
    totalAmount: "Montant total",
    paymentMethod: "Méthode de paiement",
    creditCard: "Carte de crédit",
    applePay: "Apple Pay",
    googlePay: "Google Pay",
    payWithStripe: "Payer avec Stripe",
    confirmPaymentBook: "Confirmer le paiement et réserver",
    bookingConfirmed: "Réservation confirmée !",
    bookingSuccessMsg: "Votre vol a été réservé avec succès. Présentez ce code QR à la porte.",
    bookingRef: "Référence de réservation",
    viewMyTrips: "Voir mes voyages",
    addToCalendar: "Ajouter au calendrier",
    shareTicket: "Partager le billet",
    welcomeBack: "Bon retour parmi nous",
    signInToContinue: "Connectez-vous pour continuer",
    joinFlyBook: "Rejoindre FlyBook",
    forgotPassword: "Mot de passe oublié ?",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    orContinueWith: "Ou continuer avec",
    noAccount: "Pas de compte ? Inscrivez-vous",
    alreadyAccount: "Déjà un compte ? Connectez-vous",
    cancelFlight: "Annuler le vol",
    viewTicket: "Voir le billet",
    confirmed: "Confirmé",
    seat: "Siège",
    paymentInitiatedMsg: "Fenêtre de paiement ouverte. Veuillez compléter le paiement dans le nouvel onglet, puis confirmer ci-dessous.",
    paymentRedirectMsg: "Vous serez redirigé vers notre paiement sécurisé Stripe pour compléter votre paiement.",
    flightDetails: "Détails du vol",
    bookSeat: "Réserver le siège",
    email: "Adresse e-mail",
    password: "Mot de passe",
    seamlessTravel: "Le voyage sans faille commence ici",
    cheapest: "Le moins cher",
    fastest: "Le plus rapide",
    earliest: "Le plus tôt",
    availableFlights: "Vols disponibles",
    flightsFound: "vols trouvés",
    economy: "Économique",
    business: "Affaires",
    first: "Première",
    selectOriginDest: "Veuillez sélectionner l'origine et la destination"
  }
};

// --- Components ---

const Navbar = ({ activeScreen, setScreen, language }: { activeScreen: Screen, setScreen: (s: Screen) => void, user: User | null, language: string }) => {
  if (activeScreen === 'splash' || activeScreen === 'auth') return null;
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50 md:top-0 md:bottom-auto md:px-12 transition-colors">
      <div className="hidden md:flex items-center gap-2 text-primary font-bold text-xl cursor-pointer" onClick={() => setScreen('search')}>
        <Plane className="rotate-45" />
        <span>FlyBook</span>
      </div>
      <div className="flex justify-around w-full md:w-auto md:gap-8">
        <NavItem icon={<Search size={20} />} label={t('search')} active={activeScreen === 'search' || activeScreen === 'results'} onClick={() => setScreen('search')} />
        <NavItem icon={<History size={20} />} label={t('trips')} active={activeScreen === 'history'} onClick={() => setScreen('history')} />
        <NavItem icon={<Bell size={20} />} label={t('alerts')} active={activeScreen === 'alerts'} onClick={() => setScreen('alerts')} />
        <NavItem icon={<UserIcon size={20} />} label={t('profile')} active={activeScreen === 'profile'} onClick={() => setScreen('profile')} />
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}>
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

// --- Screens ---

const SplashScreen = ({ onLogin, onSignup, language }: { onLogin: () => void, onSignup: () => void, language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-400 to-blue-600 flex flex-col items-center justify-center text-white z-[100] overflow-hidden">
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [45, 40, 45]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="mb-8 relative"
      >
        <div className="absolute -top-10 -left-10 opacity-20">
          <Cloud size={60} />
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-20">
          <Cloud size={40} />
        </div>
        <Plane size={100} className="drop-shadow-2xl" />
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-extrabold tracking-tighter mb-2"
      >
        FlyBook
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="text-lg font-medium mb-12"
      >
        {t('seamlessTravel')}
      </motion.p>

      <div className="w-full max-w-xs space-y-4 px-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSignup}
          className="w-full bg-accent text-white py-4 rounded-2xl font-bold shadow-xl shadow-accent/30"
        >
          {t('createAccount')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogin}
          className="w-full bg-transparent border-2 border-white/50 text-white py-4 rounded-2xl font-bold backdrop-blur-sm"
        >
          {t('signIn')}
        </motion.button>
      </div>

      <div className="absolute bottom-10 opacity-30">
        <Globe size={120} />
      </div>
    </div>
  );
};

const AuthScreen = ({ onLogin, initialIsLogin = true, onBack, language }: { onLogin: (u: User) => void, initialIsLogin?: boolean, onBack: () => void, language: string }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { email, password, name };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) onLogin(data);
      else alert(data.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors">
      <div className="absolute top-20 left-10 text-slate-100 dark:text-slate-900 -z-10">
        <Cloud size={100} />
      </div>
      <div className="absolute bottom-20 right-10 text-slate-100 dark:text-slate-900 -z-10">
        <Plane size={150} className="rotate-12 opacity-50" />
      </div>

      <button onClick={onBack} className="absolute top-8 left-8 p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
        <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
      </button>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 relative z-10 border border-slate-100 dark:border-slate-800">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full">
            <Plane className="text-primary rotate-45" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">{isLogin ? t('welcomeBack') : t('createAccount')}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">
          {isLogin ? t('signInToContinue') : t('joinFlyBook')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">{t('fullName')}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all dark:text-white"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1">{t('email')}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all dark:text-white"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">{t('password')}</label>
              {isLogin && <button type="button" className="text-[10px] font-bold text-primary">{t('forgotPassword')}</button>}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all mt-4">
            {isLogin ? t('signIn') : t('createAccount')}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('orContinueWith')}</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <SocialButton icon={<Chrome size={20} />} />
            <SocialButton icon={<Apple size={20} />} />
            <SocialButton icon={<Facebook size={20} />} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
          >
            {isLogin ? t('noAccount') : t('alreadyAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon }: any) => (
  <button className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600">
    {icon}
  </button>
);

const AIRPORTS = [
  { city: 'London', code: 'LHR', country: 'United Kingdom' },
  { city: 'New York', code: 'JFK', country: 'USA' },
  { city: 'Paris', code: 'CDG', country: 'France' },
  { city: 'Tokyo', code: 'HND', country: 'Japan' },
  { city: 'Bali', code: 'DPS', country: 'Indonesia' },
  { city: 'Dubai', code: 'DXB', country: 'UAE' },
  { city: 'Singapore', code: 'SIN', country: 'Singapore' },
  { city: 'Sydney', code: 'SYD', country: 'Australia' },
  { city: 'Berlin', code: 'BER', country: 'Germany' },
  { city: 'Rome', code: 'FCO', country: 'Italy' },
  { city: 'Addis Ababa', code: 'ADD', country: 'Ethiopia' },
  { city: 'Lalibela', code: 'LLI', country: 'Ethiopia' },
  { city: 'Gondar', code: 'GDQ', country: 'Ethiopia' },
  { city: 'Cairo', code: 'CAI', country: 'Egypt' },
  { city: 'Beijing', code: 'PEK', country: 'China' },
  { city: 'Agra', code: 'AGR', country: 'India' },
  { city: 'Rio de Janeiro', code: 'GIG', country: 'Brazil' },
  { city: 'Athens', code: 'ATH', country: 'Greece' },
  { city: 'Istanbul', code: 'IST', country: 'Turkey' },
  { city: 'Bangkok', code: 'BKK', country: 'Thailand' },
  { city: 'Barcelona', code: 'BCN', country: 'Spain' },
  { city: 'Venice', code: 'VCE', country: 'Italy' },
  { city: 'Prague', code: 'PRG', country: 'Czech Republic' },
  { city: 'Moscow', code: 'SVO', country: 'Russia' },
  { city: 'Cape Town', code: 'CPT', country: 'South Africa' },
  { city: 'Mexico City', code: 'MEX', country: 'Mexico' },
];

const LocationInput = ({ label, value, onChange, placeholder, icon: Icon }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState(AIRPORTS);

  useEffect(() => {
    const results = AIRPORTS.filter(a => 
      a.city.toLowerCase().includes(value.toLowerCase()) || 
      a.code.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  }, [value]);

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
        <Icon size={20} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all dark:text-white"
      />
      <AnimatePresence>
        {showDropdown && filtered.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-[60] max-h-60 overflow-y-auto"
          >
            {filtered.map((airport) => (
              <div 
                key={airport.code}
                onClick={() => {
                  onChange(`${airport.city} (${airport.code})`);
                  setShowDropdown(false);
                }}
                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex justify-between items-center border-b border-slate-50 dark:border-slate-700 last:border-0"
              >
                <div>
                  <p className="font-bold text-sm dark:text-white">{airport.city}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{airport.country}</p>
                </div>
                <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-bold text-slate-500 dark:text-slate-400">{airport.code}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchScreen = ({ onSearch, language, currency }: { onSearch: (from: string, to: string, date: string, flightClass: string) => void, language: string, currency: string }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('2024-06-15');
  const [flightClass, setFlightClass] = useState('Economy');
  const [showDestinationInfo, setShowDestinationInfo] = useState<Destination | null>(null);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const popularDestinations = showAllDestinations ? FAMOUS_PLACES : FAMOUS_PLACES.slice(0, 4);

  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto relative overflow-x-hidden">
      <header className="flex justify-between items-center mb-8 px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">FlyBook</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('search')}</p>
        </div>
        <button className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <Bell size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5 text-slate-200">
          <Plane size={120} className="rotate-45" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <LocationInput 
            placeholder={t('from')}
            value={from}
            onChange={setFrom}
            icon={MapPin}
          />
          
          <div className="flex justify-center -my-2 relative z-10">
            <button 
              onClick={() => {
                const temp = from;
                setFrom(to);
                setTo(temp);
              }}
              className="bg-primary text-white p-2 rounded-full shadow-lg border-4 border-white dark:border-slate-900 hover:scale-110 transition-transform"
            >
              <Plane className="rotate-90" size={20} />
            </button>
          </div>

          <LocationInput 
            placeholder={t('to')}
            value={to}
            onChange={setTo}
            icon={MapPin}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Calendar size={18} />
              </div>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all text-sm dark:text-white"
              />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon size={18} />
              </div>
              <select className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-0 transition-all text-sm appearance-none dark:text-white">
                <option>1 {t('passengers')}</option>
                <option>2 {t('passengers')}</option>
                <option>3 {t('passengers')}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            {['economy', 'business', 'first'].map((c) => (
              <button
                key={c}
                onClick={() => setFlightClass(c)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${flightClass === c ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}
              >
                {t(c)}
              </button>
            ))}
          </div>

          <button 
            onClick={() => {
              if (!from || !to) {
                alert(t('selectOriginDest'));
                return;
              }
              onSearch(from, to, date, flightClass);
            }}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all mt-2 flex items-center justify-center gap-2"
          >
            <Search size={20} />
            {t('findFlights')}
          </button>
        </div>
      </div>

      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg dark:text-white">{t('popular')}</h2>
          <button 
            onClick={() => setShowAllDestinations(!showAllDestinations)}
            className="text-primary text-sm font-semibold"
          >
            {showAllDestinations ? 'Show less' : t('seeAll')}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {popularDestinations.map((dest, idx) => (
            <DestinationCard 
              key={idx}
              city={dest.place} 
              country={dest.location} 
              price={dest.price || 400} 
              image={dest.image.url} 
              onClick={() => setShowDestinationInfo(dest)}
              currency={currency}
              t={t}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showDestinationInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-end md:items-center justify-center p-4"
            onClick={() => setShowDestinationInfo(null)}
          >
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl md:rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">{showDestinationInfo.place}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{showDestinationInfo.location}</p>
                </div>
                <button onClick={() => setShowDestinationInfo(null)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white">
                  <Plane size={20} className="rotate-45" />
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{showDestinationInfo.description}</p>
              <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-2xl border border-primary/10 mb-4">
                <h4 className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                  <Info size={16} />
                  Weather & Best Time
                </h4>
                <p className="text-sm text-slate-700 italic">{showDestinationInfo.weather}</p>
              </div>
              <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
                <h4 className="font-bold text-accent text-sm mb-2 flex items-center gap-2">
                  <Star size={16} />
                  Pro Tip
                </h4>
                <p className="text-sm text-slate-700 italic">{showDestinationInfo.tip}</p>
              </div>
              <button onClick={() => setShowDestinationInfo(null)} className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-8">
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DestinationCard = ({ city, country, price, image, onClick, currency, t }: any) => {
  const getCurrencySymbol = (curr: string) => {
    switch(curr) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'ETB': return 'Br';
      default: return '$';
    }
  };

  const convertPrice = (p: number, curr: string) => {
    switch(curr) {
      case 'EUR': return Math.round(p * 0.92);
      case 'GBP': return Math.round(p * 0.79);
      case 'ETB': return Math.round(p * 56.5);
      default: return p;
    }
  };

  return (
    <div onClick={onClick} className="relative rounded-3xl overflow-hidden group cursor-pointer h-48">
      <img src={image} alt={city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-xs font-medium opacity-80">{country}</p>
        <h3 className="font-bold text-lg leading-tight">{city}</h3>
        <p className="text-xs mt-1 font-semibold">{t('from')} {getCurrencySymbol(currency)}{convertPrice(price, currency)}</p>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <Info size={16} />
      </div>
    </div>
  );
};

const ResultsScreen = ({ flights, onSelect, onBack, language }: { flights: Flight[], onSelect: (f: Flight) => void, onBack: () => void, language: string }) => {
  const [sortBy, setSortBy] = useState('price');
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto overflow-x-hidden">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">{t('availableFlights')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{flights.length} {t('flightsFound')}</p>
        </div>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <SortOption active={sortBy === 'price'} onClick={() => setSortBy('price')} label={t('cheapest')} />
        <SortOption active={sortBy === 'duration'} onClick={() => setSortBy('duration')} label={t('fastest')} />
        <SortOption active={sortBy === 'departure'} onClick={() => setSortBy('departure')} label={t('earliest')} />
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <motion.div 
            key={flight.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm card-hover"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plane size={16} className="text-primary" />
                </div>
                <span className="font-bold text-sm dark:text-white">{flight.airline}</span>
              </div>
              <span className="text-primary font-bold text-lg">${flight.price}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">{new Date(flight.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{flight.from.substring(0, 3)}</p>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center">
                <p className="text-[10px] text-slate-400 font-bold mb-1">{flight.duration}</p>
                <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-1">
                    <Plane size={12} className="text-slate-300 dark:text-slate-600" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Direct</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">{new Date(flight.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{flight.to.substring(0, 3)}</p>
              </div>
            </div>

            <button 
              onClick={() => onSelect(flight)}
              className="w-full bg-slate-50 dark:bg-slate-800 text-primary py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all border border-primary/10"
            >
              Select Flight
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SortOption = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}
  >
    {label}
  </button>
);

const DetailsScreen = ({ flight, onBook, onBack, language }: { flight: Flight, onBook: () => void, onBack: () => void, language: string }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto overflow-x-hidden">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">{t('flightDetails') || 'Flight Details'}</h1>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 mb-6 relative">
        <div className="absolute top-4 right-4 text-white/10">
          <Cloud size={100} />
        </div>

        <div className="bg-primary p-6 text-white relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs opacity-70 font-medium uppercase tracking-widest">Flight Number</p>
              <p className="text-lg font-bold">{flight.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70 font-medium uppercase tracking-widest">Airline</p>
              <p className="text-lg font-bold">{flight.airline}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{flight.from.substring(0, 3).toUpperCase()}</p>
              <p className="text-xs opacity-70">{flight.from}</p>
            </div>
            <div className="flex-1 flex flex-col items-center px-4">
              <Plane className="rotate-90 mb-2" size={24} />
              <div className="w-full h-[1px] bg-white/30" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{flight.to.substring(0, 3).toUpperCase()}</p>
              <p className="text-xs opacity-70">{flight.to}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Departure</p>
              <p className="font-bold dark:text-white">{new Date(flight.departure).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Arrival</p>
              <p className="font-bold dark:text-white">{new Date(flight.arrival).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Class</p>
              <p className="font-bold dark:text-white">{flight.class}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Duration</p>
              <p className="font-bold dark:text-white">{flight.duration}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 dark:text-white">
              <Armchair size={18} className="text-primary" />
              {t('selectSeat')}
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
              <div className="grid grid-cols-4 gap-3 max-w-[200px] mx-auto">
                {['A', 'B', 'C', 'D'].map(col => (
                  [1, 2, 3, 4].map(row => {
                    const seat = `${row}${col}`;
                    const isOccupied = Math.random() < 0.2;
                    return (
                      <button
                        key={seat}
                        disabled={isOccupied}
                        onClick={() => setSelectedSeat(seat)}
                        className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${isOccupied ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed' : selectedSeat === seat ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary'}`}
                      >
                        {seat}
                      </button>
                    );
                  })
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                  <span className="text-[10px] font-bold text-slate-400">{t('available')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                  <span className="text-[10px] font-bold text-slate-400">{t('occupied')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-[10px] font-bold text-slate-400">{t('selected')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="font-bold mb-4 dark:text-white">{t('extras')}</h3>
            <div className="flex gap-4">
              <ExtraOption icon={<Plane size={16} />} label={t('baggage')} price="$25" />
              <ExtraOption icon={<UserIcon size={16} />} label={t('seat')} price="$15" />
              <ExtraOption icon={<Bell size={16} />} label={t('insurance')} price="$10" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 left-6 right-6 max-w-4xl mx-auto">
        <button 
          onClick={onBook}
          disabled={!selectedSeat}
          className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-between px-8 ${selectedSeat ? 'bg-primary text-white shadow-primary/20 hover:bg-primary-dark' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
        >
          <span>{selectedSeat ? `${t('bookSeat') || 'Book Seat'} ${selectedSeat}` : (t('selectSeat') || 'Select a Seat')}</span>
          <span className="text-xl">${flight.price}</span>
        </button>
      </div>
    </div>
  );
};

const ExtraOption = ({ icon, label, price }: any) => (
  <div className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
    <div className="flex justify-center mb-1 text-primary">{icon}</div>
    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">{label}</p>
    <p className="text-xs font-bold dark:text-white">{price}</p>
  </div>
);

const PaymentScreen = ({ flight, onConfirm, onBack, language }: { flight: Flight, onConfirm: () => void, onBack: () => void, language: string }) => {
  const stripeLink = "https://buy.stripe.com/test_9B6eV7faW19u4cTeWr6Zy01";
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const handlePayClick = () => {
    window.open(stripeLink, '_blank');
    setPaymentInitiated(true);
  };

  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto overflow-x-hidden">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">{t('payment')}</h1>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
        <h3 className="font-bold mb-4 dark:text-white">{t('summary')}</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('flightTicket')}</span>
            <span className="font-bold dark:text-white">${flight.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('taxesFees')}</span>
            <span className="font-bold dark:text-white">$45.00</span>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between">
            <span className="font-bold dark:text-white">{t('totalAmount')}</span>
            <span className="font-bold text-primary text-xl">${flight.price + 45}</span>
          </div>
        </div>
      </div>

      <h3 className="font-bold mb-4 ml-2 dark:text-white">{t('paymentMethod')}</h3>
      <div className="space-y-3 mb-8">
        <PaymentMethod icon={<CreditCard size={20} />} label={t('creditCard')} active={true} />
        <PaymentMethod icon={<Plane size={20} />} label={t('applePay')} active={false} />
        <PaymentMethod icon={<Plane size={20} />} label={t('googlePay')} active={false} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
            {paymentInitiated 
              ? (t('paymentInitiatedMsg') || "Payment window opened. Please complete the payment in the new tab and then confirm below.")
              : (t('paymentRedirectMsg') || "You will be redirected to our secure Stripe checkout to complete your payment.")}
          </p>
          <div className="flex justify-center">
            <div className={`w-16 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${paymentInitiated ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
              {paymentInitiated ? <Check size={20} /> : 'STRIPE'}
            </div>
          </div>
        </div>
      </div>

      {!paymentInitiated ? (
        <button 
          onClick={handlePayClick}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all mt-8 flex items-center justify-center gap-2"
        >
          <ExternalLink size={20} />
          {t('payWithStripe')}
        </button>
      ) : (
        <button 
          onClick={onConfirm}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all mt-8 flex items-center justify-center gap-2"
        >
          {t('confirmPaymentBook')}
        </button>
      )}
    </div>
  );
};

const PaymentMethod = ({ icon, label, active }: any) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${active ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'}`}>
    <div className={`${active ? 'text-primary' : 'text-slate-400'}`}>{icon}</div>
    <span className={`font-bold ${active ? 'text-primary' : 'text-slate-600'}`}>{label}</span>
    {active && <CheckCircle2 className="ml-auto text-primary" size={20} />}
  </div>
);

const ConfirmationScreen = ({ onDone, language }: { onDone: () => void, language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-white dark:bg-slate-950 relative overflow-y-auto py-12 transition-colors">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-primary/5 dark:bg-primary/10 -z-10" />
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-8 relative"
      >
        <CheckCircle2 size={80} className="text-green-500 dark:text-green-400" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 border-2 border-dashed border-green-200 dark:border-green-800 rounded-full"
        />
      </motion.div>

      <h1 className="text-3xl font-bold mb-2 dark:text-white">{t('bookingConfirmed')}</h1>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-12 max-w-xs">
        {t('bookingSuccessMsg')}
      </p>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 mb-12 relative w-full max-w-sm">
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full" />
        
        <div className="flex justify-center">
          <QrCode size={180} className="text-slate-800 dark:text-slate-200" />
        </div>
        <div className="mt-6 text-center border-t border-dashed border-slate-200 dark:border-slate-700 pt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('bookingRef')}</p>
          <p className="text-xl font-mono font-bold text-primary">FB-XJ9921</p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <button 
          onClick={onDone}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          {t('viewMyTrips')}
        </button>
        <div className="flex gap-3">
          <button className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-xl text-xs font-bold border border-slate-100 dark:border-slate-700">{t('addToCalendar')}</button>
          <button className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-xl text-xs font-bold border border-slate-100 dark:border-slate-700">{t('shareTicket')}</button>
        </div>
      </div>
    </div>
  );
};

const HistoryScreen = ({ bookings, onCancel, language }: { bookings: Booking[], onCancel: (id: number) => void, language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto overflow-x-hidden">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('myTrips')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('upcomingPast')}</p>
        </div>
        <button className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <Bell size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
      </header>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Plane size={48} className="mb-4 opacity-20" />
          <p>{t('noBookings')}</p>
        </div>
      ) : (
// ...
        <div className="space-y-6">
          {bookings.map((booking) => (
            <motion.div 
              key={booking.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Plane size={16} className="text-primary" />
                    </div>
                    <span className="font-bold text-sm dark:text-white">{booking.airline}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {t(booking.status) || booking.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <p className="text-xl font-bold dark:text-white">{booking.from_city.substring(0, 3).toUpperCase()}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{new Date(booking.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex-1 px-4 flex flex-col items-center">
                    <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 relative">
                      <Plane size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-[8px] font-bold text-slate-300 dark:text-slate-600 mt-1 uppercase tracking-widest">{t('confirmed')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold dark:text-white">{booking.to_city.substring(0, 3).toUpperCase()}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{new Date(booking.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <button 
                    onClick={() => onCancel(booking.id)}
                    className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    {t('cancelFlight')}
                  </button>
                  <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                    <QrCode size={14} />
                    {t('viewTicket')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const PersonalInformationSubScreen = ({ user, onSave, language }: { user: User, onSave: (updated: Partial<User>) => void, language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    dob: '1995-05-12',
    nationality: 'Ethiopian',
    passport: 'EP1234567',
    phone: '+251 911 223 344'
  });
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave({ name: formData.name, email: formData.email });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Profile picture "${file.name}" selected for upload.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
            <UserIcon size={48} />
          </div>
          <button 
            onClick={handleUploadClick}
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Camera size={16} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        <p className="text-sm font-bold text-primary mt-4 uppercase tracking-widest">{t('changeProfilePicture')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('fullName')}</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('dob')}</label>
          <input 
            type="date" 
            value={formData.dob} 
            onChange={e => setFormData({...formData, dob: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('nationality')}</label>
          <select 
            value={formData.nationality}
            onChange={e => setFormData({...formData, nationality: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white"
          >
            <option className="dark:bg-slate-800">Ethiopian</option>
            <option className="dark:bg-slate-800">American</option>
            <option className="dark:bg-slate-800">British</option>
            <option className="dark:bg-slate-800">French</option>
            <option className="dark:bg-slate-800">German</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('passportNumber')}</label>
          <input 
            type="text" 
            value={formData.passport}
            onChange={e => setFormData({...formData, passport: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('emailAddress')}</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white" 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('phoneNumber')}</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:text-white" 
          />
        </div>
      </div>

      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
        <Shield size={20} className="text-primary mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('sensitiveInfoNote')}
        </p>
      </div>

      <button 
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isSaved ? 'bg-green-500 text-white shadow-green-200' : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]'}`}
      >
        {isSaved ? (
          <>
            <Check size={20} />
            {t('saved')}
          </>
        ) : t('saveChanges')}
      </button>
    </div>
  );
};

const PaymentMethodsSubScreen = ({ language }: { language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  const [cards, setCards] = useState<any[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', holder: '', expiry: '' });

  const handleAddCard = () => {
    if (!newCard.number || !newCard.holder || !newCard.expiry) {
      alert('Please fill all card details');
      return;
    }
    setCards([...cards, { ...newCard, id: Date.now() }]);
    setNewCard({ number: '', holder: '', expiry: '' });
    setShowAddCard(false);
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {cards.length > 0 ? (
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
              <p className="text-xs font-bold tracking-widest opacity-60">VISA</p>
            </div>
            <p className="text-xl tracking-[0.2em] font-mono mb-6">**** **** **** {cards[0].number.slice(-4)}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1">Card Holder</p>
                <p className="font-bold uppercase">{cards[0].holder}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-60 mb-1">Expires</p>
                <p className="font-bold">{cards[0].expiry}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-700">
          <CreditCard size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-bold uppercase tracking-widest">No cards saved</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center ml-1">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('savedMethods')}</h3>
          <button 
            onClick={() => setShowAddCard(true)}
            className="text-primary text-xs font-bold flex items-center gap-1"
          >
            <Plus size={14} /> {t('addCard')}
          </button>
        </div>

        {cards.map(card => (
          <div key={card.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400">
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold dark:text-white">Visa ending in {card.number.slice(-4)}</p>
              <p className="text-xs text-slate-400">{card.holder}</p>
            </div>
            <button onClick={() => removeCard(card.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
        <a 
          href="https://buy.stripe.com/test_9B6eV7faW19u4cTeWr6Zy01" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-black transition-colors"
        >
          <ExternalLink size={18} />
          {t('connectStripe')}
        </a>
      </div>

      <AnimatePresence>
        {showAddCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6 dark:text-white">Add New Card</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="**** **** **** ****"
                    value={newCard.number}
                    onChange={e => setNewCard({...newCard, number: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Card Holder</label>
                  <input 
                    type="text" 
                    placeholder="JOHN DOE"
                    value={newCard.holder}
                    onChange={e => setNewCard({...newCard, holder: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={e => setNewCard({...newCard, expiry: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                    <input 
                      type="password" 
                      placeholder="***"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowAddCard(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleAddCard} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">Add Card</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NotificationsSubScreen = ({ notifications, language }: { notifications: AppNotification[], language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('recentAlerts')}</h3>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <Bell size={32} className="mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">{t('noAlerts')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.slice(0, 5).map(notif => (
              <div key={notif.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">{notif.type}</p>
                  <p className="text-[10px] text-slate-300">{notif.time}</p>
                </div>
                <p className="text-sm font-bold mb-1 dark:text-white">{notif.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{notif.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <NotificationToggle label={t('bookingConfirmations')} description={t('bookingConfirmationsDesc')} defaultChecked={true} />
        <NotificationToggle label={t('flightReminders')} description={t('flightRemindersDesc')} defaultChecked={true} />
        <NotificationToggle label={t('promotionalOffers')} description={t('promotionalOffersDesc')} defaultChecked={false} />
        <NotificationToggle label={t('travelAlerts')} description={t('travelAlertsDesc')} defaultChecked={true} />
      </div>

      <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-start gap-3">
        <Bell size={20} className="text-accent mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('travelAlertsNote') || 'We recommend keeping Travel Alerts enabled to receive real-time updates about your trips.'}
        </p>
      </div>
    </div>
  );
};

const NotificationToggle = ({ label, description, defaultChecked }: any) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <div className="flex-1 pr-4">
        <p className="font-bold text-slate-700 dark:text-slate-200">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'left-7' : 'left-1'}`}></div>
      </button>
    </div>
  );
};

const SettingsSubScreen = ({ 
  onLogout, 
  language, 
  setLanguage, 
  currency, 
  setCurrency, 
  appearance, 
  setAppearance,
  onSubScreenChange
}: { 
  onLogout: () => void, 
  language: string, 
  setLanguage: (l: string) => void, 
  currency: string, 
  setCurrency: (c: string) => void, 
  appearance: string, 
  setAppearance: (a: string) => void,
  onSubScreenChange: (s: string) => void
}) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const handleLogoutClick = () => {
    if (window.confirm(t('logoutConfirm') || 'Are you sure you want to log out?')) {
      onLogout();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t('deleteConfirm') || 'WARNING: This action is permanent. Are you sure you want to delete your account and all your data?')) {
      alert(t('deleteRequest') || 'Account deletion request submitted. Your data will be removed within 24 hours.');
      onLogout();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-slate-400"><Languages size={18} /></div>
            <p className="font-bold text-slate-700 dark:text-slate-200">{t('language')}</p>
          </div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-primary/5 dark:bg-primary/10 text-primary text-xs font-bold px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            {['English', 'Spanish', 'French', 'German', 'Amharic'].map(lang => (
              <option key={lang} value={lang} className="dark:bg-slate-800 dark:text-white">{lang}</option>
            ))}
          </select>
        </div>

        <div className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-slate-400"><Coins size={18} /></div>
            <p className="font-bold text-slate-700 dark:text-slate-200">{t('currency')}</p>
          </div>
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-primary/5 dark:bg-primary/10 text-primary text-xs font-bold px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            {['USD ($)', 'EUR (€)', 'GBP (£)', 'ETB (Br)'].map(cur => (
              <option key={cur} value={cur} className="dark:bg-slate-800 dark:text-white">{cur}</option>
            ))}
          </select>
        </div>

        <div className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-slate-400">{appearance === 'Light Mode' ? <Sun size={18} /> : <Moon size={18} />}</div>
            <p className="font-bold text-slate-700 dark:text-slate-200">{t('appearance')}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAppearance(appearance === 'Light Mode' ? 'Dark Mode' : 'Light Mode')}
              className={`w-12 h-6 rounded-full transition-colors relative ${appearance === 'Dark Mode' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all flex items-center justify-center ${appearance === 'Dark Mode' ? 'left-7' : 'left-1'}`}>
                {appearance === 'Dark Mode' ? <Moon size={10} className="text-primary" /> : <Sun size={10} className="text-slate-400" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <SettingsItem icon={<Shield size={18} />} label="privacySettings" onClick={() => onSubScreenChange('privacy')} language={language} />
        <SettingsItem icon={<Info size={18} />} label="helpSupport" onClick={() => onSubScreenChange('help')} language={language} />
        <SettingsItem icon={<FileText size={18} />} label="termsOfService" onClick={() => onSubScreenChange('terms')} language={language} />
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleLogoutClick}
          className="w-full bg-red-50 dark:bg-red-900/20 text-red-500 py-4 rounded-2xl font-bold border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
        >
          <LogOut size={18} />
          {t('logout')}
        </button>
        <button 
          onClick={handleDeleteAccount}
          className="w-full text-slate-400 py-2 text-xs font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          {t('deleteAccount')}
        </button>
      </div>
    </div>
  );
};

const PrivacySettingsSubScreen = ({ language }: { language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  const [visibility, setVisibility] = useState('Private');
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">{t('profileVisibility')}</h3>
            <p className="text-xs text-slate-500">{t('profileVisibilityDesc')}</p>
          </div>
          <select 
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="bg-primary/5 dark:bg-primary/10 text-primary text-xs font-bold px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
          >
            {['Public', 'Friends', 'Private'].map(opt => (
              <option key={opt} value={opt} className="dark:bg-slate-800 dark:text-white">{opt}</option>
            ))}
          </select>
        </div>
        <NotificationToggle label={t('dataSharing')} description={t('dataSharingDesc')} defaultChecked={false} />
        <NotificationToggle label={t('locationTracking')} description={t('locationTrackingDesc')} defaultChecked={true} />
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <SettingsItem icon={<History size={18} />} label="activityLogs" onClick={() => alert('Activity Logs: No unusual activity detected.')} language={language} />
        <SettingsItem icon={<Download size={18} />} label="dataExport" onClick={() => alert('Your data export has been requested. Check your email in a few minutes.')} language={language} />
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <strong>{t('privacyNote')}:</strong> {t('gdprNote')}
        </p>
      </div>
    </div>
  );
};

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode, key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <p className="font-bold text-slate-800 dark:text-white text-sm text-left">{title}</p>
        <ChevronRight size={18} className={`text-slate-300 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpSupportSubScreen = ({ language }: { language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  
  const tickets = [
    { id: '#TK-8821', subject: 'Refund Request - Flight FB-102', status: 'In Progress', date: 'Feb 12, 2026' }
  ];

  const handleChat = () => {
    alert('Connecting to a support agent... Please wait.');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@flybook.travel?subject=Support Request';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('faq')}</h3>
        <div className="space-y-3">
          {[
            { q: t('faq1_q'), a: t('faq1_a') },
            { q: t('faq2_q'), a: t('faq2_a') },
            { q: t('faq3_q'), a: t('faq3_a') }
          ].map((faq, i) => (
            <AccordionItem key={i} title={faq.q}>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed p-5 pt-0">{faq.a}</p>
            </AccordionItem>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('troubleshooting')}</h3>
        <div className="space-y-3">
          <AccordionItem title={t('ts1_q')}>
            <div className="p-5 pt-0 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('ts1_a')}</p>
            </div>
          </AccordionItem>
          <AccordionItem title={t('ts2_q')}>
            <div className="p-5 pt-0 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('ts2_a')}</p>
            </div>
          </AccordionItem>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('ticketTracking')}</h3>
        <div className="space-y-3">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">{ticket.id}</p>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-white mb-1">{ticket.subject}</p>
              <p className="text-[10px] text-slate-400">{ticket.date}</p>
            </div>
          ))}
          <button 
            onClick={() => alert('New ticket creation form would open here.')}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
          >
            + Create New Support Ticket
          </button>
        </div>
      </div>

      <div className="bg-primary rounded-3xl p-6 text-white text-center shadow-lg shadow-primary/20">
        <h3 className="font-bold mb-2">{t('needHelp')}</h3>
        <p className="text-white/80 text-xs mb-6">{t('supportTeamDesc')}</p>
        <div className="flex gap-3">
          <button onClick={handleChat} className="flex-1 bg-white text-primary py-3 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-colors">{t('chatWithUs')}</button>
          <button onClick={handleEmail} className="flex-1 bg-white/20 text-white py-3 rounded-2xl text-xs font-bold backdrop-blur-sm hover:bg-white/30 transition-colors">{t('emailSupport')}</button>
        </div>
      </div>
    </div>
  );
};

const TermsOfServiceSubScreen = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <AccordionItem title="1. User Responsibilities">
        Users are expected to provide accurate information and use the app in compliance with all local and international travel laws.
      </AccordionItem>
      <AccordionItem title="2. Payment & Refund Policies">
        All payments are processed securely. Refunds are subject to the specific airline or hotel cancellation policies.
      </AccordionItem>
      <AccordionItem title="3. Data Use & Privacy">
        We collect data to improve your experience. We never sell your personal information to third parties.
      </AccordionItem>
      <AccordionItem title="4. Limitations of Liability">
        FlyBook acts as an intermediary. We are not liable for delays or cancellations caused by travel providers.
      </AccordionItem>
    </div>
    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">Last Updated: February 2026</p>
  </div>
);

const SettingsItem = ({ icon, label, value, onClick, language }: any) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  const translatedLabel = translations[language]?.[label] || label;
  return (
    <div 
      onClick={onClick}
      className="p-5 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <p className="font-bold text-slate-700 dark:text-slate-200">{translatedLabel}</p>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">{value}</span>}
        <ChevronRight size={16} className="text-slate-300" />
      </div>
    </div>
  );
};

const AlertsScreen = ({ notifications, onClear, language }: { notifications: AppNotification[], onClear: () => void, language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  return (
    <div className="pb-24 pt-8 px-4 md:px-6 max-w-4xl mx-auto overflow-x-hidden">
      <header className="flex justify-between items-center mb-8 px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('alerts')}</h1>
          <p className="text-slate-500 text-sm dark:text-slate-400">{t('recentAlerts')}</p>
        </div>
        {notifications.length > 0 && (
          <button onClick={onClear} className="text-xs font-bold text-primary uppercase tracking-widest">Clear All</button>
        )}
      </header>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300">
          <Bell size={64} className="mb-4 opacity-20" />
          <p className="font-bold uppercase tracking-widest text-xs">{t('noAlerts')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-3xl border ${notif.read ? 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700' : 'bg-primary/5 dark:bg-primary/10 border-primary/10 shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 dark:text-white">{notif.title}</h3>
                <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{notif.body}</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${notif.type === 'booking' ? 'bg-green-500' : notif.type === 'reminder' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{notif.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const TravelDocumentsSubScreen = ({ language }: { language: string }) => {
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const categories = [
    { 
      id: 'boarding', 
      label: t('boardingPasses'), 
      icon: <Plane size={24} />, 
      color: 'bg-blue-500',
      purpose: 'Digital boarding passes for your upcoming flights.',
      details: 'Store all your airline boarding passes in one place. Supports QR codes and PDF formats.',
      benefits: 'Skip the check-in counter and go straight to security.',
      security: 'Encrypted storage ensures your travel data is safe.'
    },
    { 
      id: 'passport', 
      label: t('passports'), 
      icon: <Shield size={24} />, 
      color: 'bg-indigo-600',
      purpose: 'Secure copies of your passport and national ID.',
      details: 'High-resolution scans of your identification documents for emergency use.',
      benefits: 'Quick access if physical documents are lost or stolen.',
      security: 'Biometric lock required for viewing sensitive ID scans.'
    },
    { 
      id: 'hotel', 
      label: t('hotelVouchers'), 
      icon: <Hotel size={24} />, 
      color: 'bg-emerald-500',
      purpose: 'Confirmation vouchers for your hotel stays.',
      details: 'All your accommodation booking confirmations and check-in instructions.',
      benefits: 'Instant check-in with digital QR codes at participating hotels.',
      extra: 'Includes address and contact details for each property.'
    },
    { 
      id: 'insurance', 
      label: t('insurance'), 
      icon: <Heart size={24} />, 
      color: 'bg-rose-500',
      purpose: 'Travel insurance policy details and emergency contacts.',
      details: 'Policy numbers, coverage details, and international emergency assistance numbers.',
      benefits: 'One-tap access to emergency medical assistance.',
      extra: 'Valid for worldwide travel coverage.'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeCategory) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: activeCategory,
        date: new Date().toLocaleDateString()
      };
      setDocuments([...documents, newDoc]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (activeCategory) {
    const cat = categories.find(c => c.id === activeCategory)!;
    const catDocs = documents.filter(d => d.type === activeCategory);

    return (
      <div className="space-y-6">
        <button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
          <ArrowLeft size={16} /> {t('backToDocuments')}
        </button>
        
        <div className={`p-6 rounded-3xl text-white ${cat.color} shadow-lg mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              {cat.icon}
            </div>
            <h2 className="text-2xl font-bold">{cat.label}</h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">{cat.purpose}</p>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-primary" /> Details & Benefits
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Details</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{cat.details}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Benefits</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{cat.benefits}</p>
              </div>
              {cat.security && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30 flex items-start gap-2">
                  <Shield size={16} className="text-red-500 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">{cat.security}</p>
                </div>
              )}
              {cat.extra && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed border-t border-slate-50 dark:border-slate-700 pt-4">{cat.extra}</p>
              )}
            </div>
          </section>

          {activeCategory === 'hotel' && (
            <section className="bg-slate-900 p-8 rounded-3xl text-white text-center">
              <h3 className="font-bold mb-6">Your Hotel Check-in QR</h3>
              <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                <QrCode size={150} className="text-slate-900" />
              </div>
              <p className="text-xs text-white/60">Scan this code at reception for instant check-in</p>
            </section>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />

          <div 
            onClick={triggerUpload}
            className="flex flex-col items-center justify-center py-12 text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Plus size={32} className="mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">{t('upload')} {cat.label}</p>
          </div>

          {catDocs.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t('uploadedDocuments')}</h4>
              {catDocs.map(doc => (
                <div key={doc.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold dark:text-white">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.date}</p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat.id} onClick={() => setActiveCategory(cat.id)}>
            <DocumentCard icon={cat.icon} label={cat.label} count={documents.filter(d => d.type === cat.id).length} color={cat.color} />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center ml-1">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('recentDocuments')}</h3>
          <button className="text-primary text-xs font-bold flex items-center gap-1" onClick={triggerUpload}>
            <Plus size={14} /> {t('addNew')}
          </button>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
        />

        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <FileText size={32} className="mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">{t('noDocuments')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.slice(0, 3).map(doc => (
              <div key={doc.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="text-sm font-bold dark:text-white">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">{doc.date}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center gap-4 cursor-pointer hover:bg-black transition-colors" onClick={() => alert('Scanner starting...')}>
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
          <QrCode size={24} />
        </div>
        <div className="flex-1">
          <p className="font-bold">QR Scanner</p>
          <p className="text-xs text-white/40">Quickly upload boarding passes</p>
        </div>
        <ChevronRight size={20} className="text-slate-500" />
      </div>
    </div>
  );
};

const DocumentCard = ({ icon, label, count, color }: any) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-current/20`}>
      {icon}
    </div>
    <p className="font-bold text-slate-700 dark:text-white text-sm mb-1">{label}</p>
    <p className="text-xs text-slate-400">{count} {count === 1 ? 'document' : 'documents'}</p>
  </div>
);

const PremiumUpgradeSubScreen = () => {
  const stripeLink = "https://buy.stripe.com/test_9B6eV7faW19u4cTeWr6Zy01";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-accent to-accent-dark rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <Star size={40} className="fill-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">FlyBook Premium</h2>
          <p className="text-white/80 mb-8">Elevate your travel experience to the next level.</p>
          
          <div className="space-y-4 text-left mb-8">
            {[
              'Unlimited Lounge Access',
              'Priority Boarding & Check-in',
              'Extra Baggage Allowance',
              '24/7 Concierge Service',
              'Exclusive Flight Deals'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm font-bold">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Monthly Plan</p>
            <p className="text-3xl font-bold">$19.99<span className="text-sm font-normal opacity-60">/mo</span></p>
          </div>

          <button 
            onClick={() => window.open(stripeLink, '_blank')}
            className="w-full bg-white text-accent py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink size={20} />
            Start 7-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = ({ 
  user, 
  onLogout, 
  onUpdateUser, 
  notifications,
  language,
  setLanguage,
  currency,
  setCurrency,
  appearance,
  setAppearance
}: { 
  user: User | null, 
  onLogout: () => void, 
  onUpdateUser: (u: Partial<User>) => void, 
  notifications: AppNotification[],
  language: string,
  setLanguage: (l: string) => void,
  currency: string,
  setCurrency: (c: string) => void,
  appearance: string,
  setAppearance: (a: string) => void
}) => {
  const [subScreen, setSubScreen] = useState<string | null>(null);
  if (!user) return null;
  const t = (key: string) => translations[language]?.[key] || translations['English'][key];

  const handleItemClick = (id: string) => {
    setSubScreen(id);
  };

  if (subScreen) {
    const subScreenTitle = {
      'personal': t('personalInfo'),
      'payment': t('paymentMethods'),
      'notifications': t('notifications'),
      'settings': t('settings'),
      'privacy': t('privacySettings'),
      'help': t('helpSupport'),
      'terms': t('termsOfService'),
      'docs': t('travelDocs'),
      'premium': t('premium')
    }[subScreen] || subScreen;

    return (
      <div className="pb-24 pt-8 px-6 max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setSubScreen(null)} className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">{subScreenTitle}</h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800"
        >
          {subScreen === 'personal' && <PersonalInformationSubScreen user={user} onSave={onUpdateUser} language={language} />}
          {subScreen === 'payment' && <PaymentMethodsSubScreen language={language} />}
          {subScreen === 'notifications' && <NotificationsSubScreen notifications={notifications} language={language} />}
          {subScreen === 'settings' && (
            <SettingsSubScreen 
              onLogout={onLogout} 
              language={language} 
              setLanguage={setLanguage} 
              currency={currency} 
              setCurrency={setCurrency} 
              appearance={appearance} 
              setAppearance={setAppearance}
              onSubScreenChange={setSubScreen}
            />
          )}
          {subScreen === 'privacy' && <PrivacySettingsSubScreen language={language} />}
          {subScreen === 'help' && <HelpSupportSubScreen language={language} />}
          {subScreen === 'terms' && <TermsOfServiceSubScreen />}
          {subScreen === 'docs' && <TravelDocumentsSubScreen language={language} />}
          {subScreen === 'premium' && <PremiumUpgradeSubScreen />}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 px-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('profile')}</h1>
        <button onClick={onLogout} className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl text-red-500">
          <LogOut size={20} />
        </button>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-8 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-primary/5">
          <Globe size={150} />
        </div>
        
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary relative z-10">
          <UserIcon size={40} />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
          <p className="text-slate-500 text-sm">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <div className="bg-primary/10 px-3 py-1 rounded-full">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Frequent Flyer: {user.frequent_flyer_no || 'FB-88291'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ProfileItem icon={<UserIcon size={20} />} label={t('personalInfo')} onClick={() => handleItemClick('personal')} />
        <ProfileItem icon={<CreditCard size={20} />} label={t('paymentMethods')} onClick={() => handleItemClick('payment')} />
        <ProfileItem icon={<Settings size={20} />} label={t('settings')} onClick={() => handleItemClick('settings')} />
        <ProfileItem icon={<MapIcon size={20} />} label={t('travelDocs')} onClick={() => handleItemClick('docs')} />
      </div>

      <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-3xl p-6 text-center border border-primary/10 dark:border-primary/20">
        <h3 className="font-bold text-primary mb-2">{t('premium')}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Get unlimited lounge access and priority boarding.</p>
        <button 
          onClick={() => handleItemClick('Premium Upgrade')}
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
  >
    <div className="text-slate-400">{icon}</div>
    <span className="font-bold text-slate-700 dark:text-slate-200 flex-1">{label}</span>
    <ChevronRight size={18} className="text-slate-300" />
  </div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [authIsLogin, setAuthIsLogin] = useState(true);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Global Settings
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD ($)');
  const [appearance, setAppearance] = useState('Light Mode');

  useEffect(() => {
    if (appearance === 'Dark Mode') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-950');
      document.body.classList.remove('bg-slate-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-slate-50');
      document.body.classList.remove('bg-slate-950');
    }
  }, [appearance]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const addNotification = (title: string, body: string, type: AppNotification['type']) => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      body,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
      // Request notification permission on login
      notificationService.requestPermission();
    }
  }, [user]);

  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  const fetchBookings = async () => {
    if (!user) return;
    const res = await fetch(`/api/bookings/${user.id}`);
    const data = await res.json();
    setBookings(data);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setScreen('search');
  };

  const handleSearch = async (from: string, to: string, date: string, flightClass: string) => {
    const res = await fetch(`/api/flights/search?from=${from}&to=${to}&date=${date}&class=${flightClass}`);
    const data = await res.json();
    setFlights(data);
    setScreen('results');
  };

  const handleBooking = async () => {
    if (!user || !selectedFlight) return;
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        flight_id: selectedFlight.id,
        from_city: selectedFlight.from,
        to_city: selectedFlight.to,
        departure_time: selectedFlight.departure,
        arrival_time: selectedFlight.arrival,
        airline: selectedFlight.airline,
        price: selectedFlight.price,
        seat: '12A'
      })
    });
    if (res.ok) {
      await fetchBookings();
      setScreen('confirmation');

      const title = 'Booking Confirmed! ✈️';
      const body = `Your flight to ${selectedFlight.to} has been successfully booked.`;
      
      // Add to internal notifications state
      addNotification(title, body, 'booking');

      // Trigger Browser Notification
      notificationService.showNotification(title, {
        body,
        icon: 'https://ais-dev-dsoscwtkqsb74h76fletr3-361430282127.europe-west2.run.app/favicon.ico'
      });

      // Show In-App Toast as fallback/extra feedback
      showToast(body);

      // Schedule a reminder (e.g., 2 hours before flight)
      // For demo purposes, we'll schedule it for 10 seconds from now
      notificationService.scheduleNotification('Flight Reminder ⏰', 10000, {
        body: `Don't forget! Your flight to ${selectedFlight.to} departs soon.`,
      });

      // Also add reminder to internal state after delay
      setTimeout(() => {
        addNotification('Flight Reminder ⏰', `Don't forget! Your flight to ${selectedFlight.to} departs soon.`, 'reminder');
      }, 10000);
    }
  };

  const handleCancel = async (id: number) => {
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) fetchBookings();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0 md:pt-20 overflow-y-auto transition-colors duration-300">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <SplashScreen 
            onLogin={() => { setAuthIsLogin(true); setScreen('auth'); }} 
            onSignup={() => { setAuthIsLogin(false); setScreen('auth'); }} 
            language={language}
          />
        )}

        {screen === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AuthScreen 
              onLogin={handleLogin} 
              initialIsLogin={authIsLogin} 
              onBack={() => setScreen('splash')} 
              language={language}
            />
          </motion.div>
        )}

        {screen === 'search' && (
          <motion.div key="search" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SearchScreen onSearch={handleSearch} language={language} currency={currency} />
          </motion.div>
        )}

        {screen === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ResultsScreen flights={flights} onSelect={(f) => { setSelectedFlight(f); setScreen('details'); }} onBack={() => setScreen('search')} language={language} />
          </motion.div>
        )}

        {screen === 'details' && selectedFlight && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <DetailsScreen flight={selectedFlight} onBook={() => setScreen('payment')} onBack={() => setScreen('results')} language={language} />
          </motion.div>
        )}

        {screen === 'payment' && selectedFlight && (
          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <PaymentScreen flight={selectedFlight} onConfirm={handleBooking} onBack={() => setScreen('details')} language={language} />
          </motion.div>
        )}

        {screen === 'confirmation' && (
          <motion.div key="confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConfirmationScreen onDone={() => setScreen('history')} language={language} />
          </motion.div>
        )}

        {screen === 'history' && (
          <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <HistoryScreen bookings={bookings} onCancel={handleCancel} language={language} />
          </motion.div>
        )}

        {screen === 'alerts' && (
          <motion.div key="alerts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <AlertsScreen notifications={notifications} onClear={() => setNotifications([])} language={language} />
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ProfileScreen 
              user={user} 
              onLogout={() => { setUser(null); setScreen('auth'); }} 
              onUpdateUser={handleUpdateUser} 
              notifications={notifications}
              language={language}
              setLanguage={setLanguage}
              currency={currency}
              setCurrency={setCurrency}
              appearance={appearance}
              setAppearance={setAppearance}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar activeScreen={screen} setScreen={setScreen} user={user} language={language} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-[300] flex items-center gap-3 border border-white/10"
          >
            <div className="bg-primary/20 p-2 rounded-full">
              <Bell size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold">Notification</p>
              <p className="text-[11px] opacity-80 leading-tight">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="opacity-40 hover:opacity-100">
              <Plus size={18} className="rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
