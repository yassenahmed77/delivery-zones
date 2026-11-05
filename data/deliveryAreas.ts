// ============================================================
// Delivery Areas Data File
// Edit this file to add, remove, or rename areas without
// changing any form logic.
// ============================================================

export interface Subarea {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface MainArea {
  id: string;
  nameAr: string;
  nameEn: string;
  subareas: Subarea[];
}

export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  mainAreas: MainArea[];
}

export const deliveryAreas: Governorate[] = [
  {
    id: "cairo",
    nameAr: "القاهرة",
    nameEn: "Cairo",
    mainAreas: [
      {
        id: "cairo-rod-el-farag",
        nameAr: "روض الفرج",
        nameEn: "Rod El Farag",
        subareas: [
          { id: "cairo-rod-el-farag-main", nameAr: "روض الفرج (عام)", nameEn: "Rod El Farag (General)" },
          { id: "cairo-rod-el-farag-shubra-road", nameAr: "طريق شبرا", nameEn: "Shubra Road" },
        ],
      },
      {
        id: "cairo-shubra",
        nameAr: "شبرا",
        nameEn: "Shubra",
        subareas: [
          { id: "cairo-shubra-main", nameAr: "شبرا (عام)", nameEn: "Shubra (General)" },
          { id: "cairo-shubra-el-kheima", nameAr: "شبرا الخيمة", nameEn: "Shubra El Kheima" },
          { id: "cairo-shubra-center", nameAr: "وسط شبرا", nameEn: "Shubra Center" },
        ],
      },
      {
        id: "cairo-sahel",
        nameAr: "الساحل",
        nameEn: "Sahel",
        subareas: [
          { id: "cairo-sahel-main", nameAr: "الساحل (عام)", nameEn: "Sahel (General)" },
          { id: "cairo-sahel-dar-elsalam-bridge", nameAr: "دار السلام (كوبري)", nameEn: "Dar El Salam Bridge" },
        ],
      },
      {
        id: "cairo-zeitoun",
        nameAr: "الزيتون",
        nameEn: "Zeitoun",
        subareas: [
          { id: "cairo-zeitoun-main", nameAr: "الزيتون (عام)", nameEn: "Zeitoun (General)" },
          { id: "cairo-zeitoun-sports-club", nameAr: "نادي الزيتون", nameEn: "Zeitoun Sports Club" },
        ],
      },
      {
        id: "cairo-hadayek-el-qobba",
        nameAr: "حدائق القبة",
        nameEn: "Hadayek El Qobba",
        subareas: [
          { id: "cairo-hadayek-el-qobba-main", nameAr: "حدائق القبة (عام)", nameEn: "Hadayek El Qobba (General)" },
          { id: "cairo-hadayek-el-qobba-palace", nameAr: "منطقة القصر", nameEn: "Palace Area" },
        ],
      },
      {
        id: "cairo-el-zawya-el-hamra",
        nameAr: "الزاوية الحمراء",
        nameEn: "El Zawya El Hamra",
        subareas: [
          { id: "cairo-el-zawya-el-hamra-main", nameAr: "الزاوية الحمراء (عام)", nameEn: "El Zawya El Hamra (General)" },
        ],
      },
      {
        id: "cairo-el-daher",
        nameAr: "الظاهر",
        nameEn: "El Daher",
        subareas: [
          { id: "cairo-el-daher-main", nameAr: "الظاهر (عام)", nameEn: "El Daher (General)" },
          { id: "cairo-el-daher-faggala", nameAr: "الفجالة", nameEn: "Faggala" },
        ],
      },
      {
        id: "cairo-abbassia",
        nameAr: "عباسية",
        nameEn: "Abbassia",
        subareas: [
          { id: "cairo-abbassia-main", nameAr: "عباسية (عام)", nameEn: "Abbassia (General)" },
          { id: "cairo-abbassia-koliet-el-tarbiya", nameAr: "كلية التربية الرياضية", nameEn: "Sports Education College" },
          { id: "cairo-abbassia-tram-st", nameAr: "شارع الترام", nameEn: "Tram Street" },
        ],
      },
      {
        id: "cairo-heliopolis",
        nameAr: "مصر الجديدة / هليوبوليس",
        nameEn: "Heliopolis / Masr El Gedida",
        subareas: [
          { id: "cairo-heliopolis-main", nameAr: "مصر الجديدة (عام)", nameEn: "Heliopolis (General)" },
          { id: "cairo-heliopolis-korba", nameAr: "الكوربة", nameEn: "Korba" },
          { id: "cairo-heliopolis-victory-college", nameAr: "كلية فيكتوريا", nameEn: "Victoria College" },
          { id: "cairo-heliopolis-merghani", nameAr: "المرغني", nameEn: "Merghani" },
          { id: "cairo-heliopolis-hegaz", nameAr: "الحجاز", nameEn: "Hegaz" },
          { id: "cairo-heliopolis-sport-club", nameAr: "النادي الأهلي", nameEn: "Al Ahly Club" },
          { id: "cairo-heliopolis-ard-el-golf", nameAr: "أرض الجولف", nameEn: "Ard El Golf" },
          { id: "cairo-heliopolis-almaza", nameAr: "الماظة", nameEn: "Almaza" },
        ],
      },
      {
        id: "cairo-nasr-city",
        nameAr: "مدينة نصر",
        nameEn: "Nasr City",
        subareas: [
          { id: "cairo-nasr-city-abbas-el-akkad", nameAr: "عباس العقاد", nameEn: "Abbas El Akkad" },
          { id: "cairo-nasr-city-makram-ebeid", nameAr: "مكرم عبيد", nameEn: "Makram Ebeid" },
          { id: "cairo-nasr-city-mostafa-el-nahas", nameAr: "مصطفى النحاس", nameEn: "Mostafa El Nahas" },
          { id: "cairo-nasr-city-el-tayaran", nameAr: "الطيران", nameEn: "El Tayaran" },
          { id: "cairo-nasr-city-ahmed-el-zomor", nameAr: "أحمد الزمر", nameEn: "Ahmed El Zomor" },
          { id: "cairo-nasr-city-emtedad-ramses", nameAr: "امتداد رمسيس", nameEn: "Emtedad Ramses" },
          { id: "cairo-nasr-city-zahraa", nameAr: "زهراء مدينة نصر", nameEn: "Zahraa Nasr City" },
          { id: "cairo-nasr-city-free-zone", nameAr: "المنطقة الحرة", nameEn: "Free Zone" },
          { id: "cairo-nasr-city-district-1", nameAr: "الحي الأول", nameEn: "First District" },
          { id: "cairo-nasr-city-district-2", nameAr: "الحي الثاني", nameEn: "Second District" },
          { id: "cairo-nasr-city-district-3", nameAr: "الحي الثالث", nameEn: "Third District" },
          { id: "cairo-nasr-city-district-4", nameAr: "الحي الرابع", nameEn: "Fourth District" },
          { id: "cairo-nasr-city-district-5", nameAr: "الحي الخامس", nameEn: "Fifth District" },
          { id: "cairo-nasr-city-district-6", nameAr: "الحي السادس", nameEn: "Sixth District" },
          { id: "cairo-nasr-city-district-7", nameAr: "الحي السابع", nameEn: "Seventh District" },
          { id: "cairo-nasr-city-district-8", nameAr: "الحي الثامن", nameEn: "Eighth District" },
          { id: "cairo-nasr-city-district-9", nameAr: "الحي التاسع", nameEn: "Ninth District" },
          { id: "cairo-nasr-city-district-10", nameAr: "الحي العاشر", nameEn: "Tenth District" },
          { id: "cairo-nasr-city-district-11", nameAr: "الحي الحادي عشر", nameEn: "Eleventh District" },
          { id: "cairo-nasr-city-district-12", nameAr: "الحي الثاني عشر", nameEn: "Twelfth District" },
          { id: "cairo-nasr-city-district-13", nameAr: "الحي الثالث عشر", nameEn: "Thirteenth District" },
          { id: "cairo-nasr-city-district-14", nameAr: "الحي الرابع عشر", nameEn: "Fourteenth District" },
          { id: "cairo-nasr-city-nozha", nameAr: "النزهة", nameEn: "Nozha" },
          { id: "cairo-nasr-city-el-salam", nameAr: "السلام (مدينة نصر)", nameEn: "El Salam (Nasr City)" },
        ],
      },
      {
        id: "cairo-new-cairo",
        nameAr: "القاهرة الجديدة / التجمع الخامس",
        nameEn: "New Cairo / Fifth Settlement",
        subareas: [
          { id: "cairo-new-cairo-narges", nameAr: "النرجس", nameEn: "Narges" },
          { id: "cairo-new-cairo-new-narges", nameAr: "النرجس الجديدة", nameEn: "New Narges" },
          { id: "cairo-new-cairo-banafseg", nameAr: "البنفسج", nameEn: "Banafseg" },
          { id: "cairo-new-cairo-yasmeen", nameAr: "الياسمين", nameEn: "Yasmeen" },
          { id: "cairo-new-cairo-koronfel", nameAr: "القرنفل", nameEn: "Koronfel" },
          { id: "cairo-new-cairo-andalus", nameAr: "الأندلس", nameEn: "Andalus" },
          { id: "cairo-new-cairo-north-academy", nameAr: "شمال الأكاديمية", nameEn: "North Academy" },
          { id: "cairo-new-cairo-south-academy", nameAr: "جنوب الأكاديمية", nameEn: "South Academy" },
          { id: "cairo-new-cairo-north-investors", nameAr: "شمال المستثمرين", nameEn: "North Investors" },
          { id: "cairo-new-cairo-south-investors", nameAr: "جنوب المستثمرين", nameEn: "South Investors" },
          { id: "cairo-new-cairo-beit-el-watan", nameAr: "بيت الوطن", nameEn: "Beit El Watan" },
          { id: "cairo-new-cairo-north-lotus", nameAr: "اللوتس الشمالي", nameEn: "North Lotus" },
          { id: "cairo-new-cairo-south-lotus", nameAr: "اللوتس الجنوبي", nameEn: "South Lotus" },
          { id: "cairo-new-cairo-rehab", nameAr: "الرحاب", nameEn: "Rehab" },
          { id: "cairo-new-cairo-madinaty", nameAr: "مدينتي", nameEn: "Madinaty" },
          { id: "cairo-new-cairo-golden-square", nameAr: "الميدان الذهبي (Golden Square)", nameEn: "Golden Square" },
          { id: "cairo-new-cairo-90th-north", nameAr: "التسعين الشمالي", nameEn: "90th Street North" },
          { id: "cairo-new-cairo-90th-south", nameAr: "التسعين الجنوبي", nameEn: "90th Street South" },
          { id: "cairo-new-cairo-first-district", nameAr: "الحي الأول (التجمع)", nameEn: "First District" },
          { id: "cairo-new-cairo-second-district", nameAr: "الحي الثاني (التجمع)", nameEn: "Second District" },
          { id: "cairo-new-cairo-third-district", nameAr: "الحي الثالث (التجمع)", nameEn: "Third District" },
          { id: "cairo-new-cairo-choueifat", nameAr: "الشويفات", nameEn: "Choueifat" },
          { id: "cairo-new-cairo-american-univ", nameAr: "الجامعة الأمريكية", nameEn: "American University" },
        ],
      },
      {
        id: "cairo-maadi",
        nameAr: "المعادي",
        nameEn: "Maadi",
        subareas: [
          { id: "cairo-maadi-main", nameAr: "المعادي (عام)", nameEn: "Maadi (General)" },
          { id: "cairo-maadi-degla", nameAr: "دجلة", nameEn: "Degla" },
          { id: "cairo-maadi-sarayat", nameAr: "السرايات", nameEn: "Sarayat" },
          { id: "cairo-maadi-el-laselky", nameAr: "اللاسلكي", nameEn: "El Laselky" },
          { id: "cairo-maadi-kornish", nameAr: "كورنيش المعادي", nameEn: "Kornish El Maadi" },
          { id: "cairo-maadi-new-maadi", nameAr: "المعادي الجديدة", nameEn: "New Maadi" },
        ],
      },
      {
        id: "cairo-mokattam",
        nameAr: "المقطم",
        nameEn: "Mokattam",
        subareas: [
          { id: "cairo-mokattam-main", nameAr: "المقطم (عام)", nameEn: "Mokattam (General)" },
          { id: "cairo-mokattam-el-haram", nameAr: "الهضبة", nameEn: "El Hadaba" },
        ],
      },
      {
        id: "cairo-ain-shams",
        nameAr: "عين شمس",
        nameEn: "Ain Shams",
        subareas: [
          { id: "cairo-ain-shams-main", nameAr: "عين شمس (عام)", nameEn: "Ain Shams (General)" },
          { id: "cairo-ain-shams-east", nameAr: "عين شمس الشرقية", nameEn: "East Ain Shams" },
          { id: "cairo-ain-shams-west", nameAr: "عين شمس الغربية", nameEn: "West Ain Shams" },
        ],
      },
      {
        id: "cairo-matariya",
        nameAr: "المطرية",
        nameEn: "Matariya",
        subareas: [
          { id: "cairo-matariya-main", nameAr: "المطرية (عام)", nameEn: "Matariya (General)" },
        ],
      },
      {
        id: "cairo-marg",
        nameAr: "المرج",
        nameEn: "Marg",
        subareas: [
          { id: "cairo-marg-main", nameAr: "المرج (عام)", nameEn: "Marg (General)" },
          { id: "cairo-marg-new", nameAr: "المرج الجديدة", nameEn: "New Marg" },
        ],
      },
      {
        id: "cairo-salam",
        nameAr: "مدينة السلام",
        nameEn: "Salam City",
        subareas: [
          { id: "cairo-salam-main", nameAr: "السلام (عام)", nameEn: "Salam (General)" },
        ],
      },
      {
        id: "cairo-gesr-el-suez",
        nameAr: "جسر السويس",
        nameEn: "Gesr El Suez",
        subareas: [
          { id: "cairo-gesr-el-suez-main", nameAr: "جسر السويس (عام)", nameEn: "Gesr El Suez (General)" },
        ],
      },
      {
        id: "cairo-downtown",
        nameAr: "وسط البلد",
        nameEn: "Downtown Cairo",
        subareas: [
          { id: "cairo-downtown-main", nameAr: "وسط البلد (عام)", nameEn: "Downtown (General)" },
          { id: "cairo-downtown-ramses", nameAr: "رمسيس", nameEn: "Ramses" },
          { id: "cairo-downtown-tahrir", nameAr: "التحرير", nameEn: "Tahrir" },
          { id: "cairo-downtown-qasr-el-nil", nameAr: "قصر النيل", nameEn: "Qasr El Nil" },
        ],
      },
      {
        id: "cairo-garden-city",
        nameAr: "جاردن سيتي",
        nameEn: "Garden City",
        subareas: [
          { id: "cairo-garden-city-main", nameAr: "جاردن سيتي (عام)", nameEn: "Garden City (General)" },
        ],
      },
      {
        id: "cairo-zamalek",
        nameAr: "الزمالك",
        nameEn: "Zamalek",
        subareas: [
          { id: "cairo-zamalek-main", nameAr: "الزمالك (عام)", nameEn: "Zamalek (General)" },
          { id: "cairo-zamalek-north", nameAr: "شمال الزمالك", nameEn: "North Zamalek" },
          { id: "cairo-zamalek-south", nameAr: "جنوب الزمالك", nameEn: "South Zamalek" },
        ],
      },
      {
        id: "cairo-manial",
        nameAr: "المنيل",
        nameEn: "Manial",
        subareas: [
          { id: "cairo-manial-main", nameAr: "المنيل (عام)", nameEn: "Manial (General)" },
        ],
      },
      {
        id: "cairo-sayeda-zeinab",
        nameAr: "السيدة زينب",
        nameEn: "Sayeda Zeinab",
        subareas: [
          { id: "cairo-sayeda-zeinab-main", nameAr: "السيدة زينب (عام)", nameEn: "Sayeda Zeinab (General)" },
          { id: "cairo-sayeda-zeinab-port-said-st", nameAr: "شارع بورسعيد", nameEn: "Port Said Street" },
        ],
      },
      {
        id: "cairo-old-cairo",
        nameAr: "مصر القديمة",
        nameEn: "Old Cairo",
        subareas: [
          { id: "cairo-old-cairo-main", nameAr: "مصر القديمة (عام)", nameEn: "Old Cairo (General)" },
          { id: "cairo-old-cairo-fustat", nameAr: "الفسطاط", nameEn: "Fustat" },
        ],
      },
      {
        id: "cairo-dar-el-salam",
        nameAr: "دار السلام",
        nameEn: "Dar El Salam",
        subareas: [
          { id: "cairo-dar-el-salam-main", nameAr: "دار السلام (عام)", nameEn: "Dar El Salam (General)" },
        ],
      },
      {
        id: "cairo-basateen",
        nameAr: "البساتين",
        nameEn: "Basateen",
        subareas: [
          { id: "cairo-basateen-main", nameAr: "البساتين (عام)", nameEn: "Basateen (General)" },
        ],
      },
      {
        id: "cairo-helwan",
        nameAr: "حلوان",
        nameEn: "Helwan",
        subareas: [
          { id: "cairo-helwan-main", nameAr: "حلوان (عام)", nameEn: "Helwan (General)" },
          { id: "cairo-helwan-ain-helwan", nameAr: "عين حلوان", nameEn: "Ain Helwan" },
          { id: "cairo-helwan-tebbin", nameAr: "التبين", nameEn: "Tebbin" },
        ],
      },
      {
        id: "cairo-15-may-city",
        nameAr: "مدينة 15 مايو",
        nameEn: "15 May City",
        subareas: [
          { id: "cairo-15-may-main", nameAr: "15 مايو (عام)", nameEn: "15 May (General)" },
        ],
      },
      {
        id: "cairo-obour-city",
        nameAr: "مدينة العبور",
        nameEn: "Obour City",
        subareas: [
          { id: "cairo-obour-main", nameAr: "العبور (عام)", nameEn: "Obour (General)" },
          { id: "cairo-obour-district-1", nameAr: "الحي الأول (العبور)", nameEn: "First District (Obour)" },
          { id: "cairo-obour-district-2", nameAr: "الحي الثاني (العبور)", nameEn: "Second District (Obour)" },
          { id: "cairo-obour-industrial", nameAr: "المنطقة الصناعية (العبور)", nameEn: "Industrial Area (Obour)" },
        ],
      },
      {
        id: "cairo-shorouk-city",
        nameAr: "مدينة الشروق",
        nameEn: "Shorouk City",
        subareas: [
          { id: "cairo-shorouk-main", nameAr: "الشروق (عام)", nameEn: "Shorouk (General)" },
          { id: "cairo-shorouk-district-1", nameAr: "الحي الأول (الشروق)", nameEn: "First District (Shorouk)" },
          { id: "cairo-shorouk-district-2", nameAr: "الحي الثاني (الشروق)", nameEn: "Second District (Shorouk)" },
        ],
      },
      {
        id: "cairo-badr-city",
        nameAr: "مدينة بدر",
        nameEn: "Badr City",
        subareas: [
          { id: "cairo-badr-main", nameAr: "بدر (عام)", nameEn: "Badr (General)" },
          { id: "cairo-badr-district-1", nameAr: "الحي الأول (بدر)", nameEn: "First District (Badr)" },
        ],
      },
      {
        id: "cairo-new-capital",
        nameAr: "العاصمة الإدارية الجديدة",
        nameEn: "New Administrative Capital",
        subareas: [
          { id: "cairo-new-capital-main", nameAr: "العاصمة الإدارية (عام)", nameEn: "New Capital (General)" },
          { id: "cairo-new-capital-r1", nameAr: "السكن R1", nameEn: "R1 Residential" },
          { id: "cairo-new-capital-r2", nameAr: "السكن R2", nameEn: "R2 Residential" },
          { id: "cairo-new-capital-r3", nameAr: "السكن R3", nameEn: "R3 Residential" },
          { id: "cairo-new-capital-downtown", nameAr: "وسط البلد (العاصمة)", nameEn: "Downtown (New Capital)" },
          { id: "cairo-new-capital-gov-district", nameAr: "الحي الحكومي", nameEn: "Government District" },
        ],
      },
    ],
  },
  {
    id: "giza",
    nameAr: "الجيزة",
    nameEn: "Giza",
    mainAreas: [
      {
        id: "giza-dokki",
        nameAr: "الدقي",
        nameEn: "Dokki",
        subareas: [
          { id: "giza-dokki-main", nameAr: "الدقي (عام)", nameEn: "Dokki (General)" },
          { id: "giza-dokki-tahrir-st", nameAr: "شارع التحرير", nameEn: "Tahrir Street" },
          { id: "giza-dokki-mesaha-sq", nameAr: "ميدان المساحة", nameEn: "Mesaha Square" },
        ],
      },
      {
        id: "giza-mohandessin",
        nameAr: "المهندسين",
        nameEn: "Mohandessin",
        subareas: [
          { id: "giza-mohandessin-main", nameAr: "المهندسين (عام)", nameEn: "Mohandessin (General)" },
          { id: "giza-mohandessin-lebanon-st", nameAr: "شارع لبنان", nameEn: "Lebanon Street" },
          { id: "giza-mohandessin-sudan-st", nameAr: "شارع السودان", nameEn: "Sudan Street" },
          { id: "giza-mohandessin-syria-st", nameAr: "شارع سوريا", nameEn: "Syria Street" },
          { id: "giza-mohandessin-gameat-el-dowal", nameAr: "جامعة الدول العربية", nameEn: "Arab League Street" },
        ],
      },
      {
        id: "giza-agouza",
        nameAr: "العجوزة",
        nameEn: "Agouza",
        subareas: [
          { id: "giza-agouza-main", nameAr: "العجوزة (عام)", nameEn: "Agouza (General)" },
          { id: "giza-agouza-corniche", nameAr: "كورنيش العجوزة", nameEn: "Agouza Corniche" },
        ],
      },
      {
        id: "giza-imbaba",
        nameAr: "إمبابة",
        nameEn: "Imbaba",
        subareas: [
          { id: "giza-imbaba-main", nameAr: "إمبابة (عام)", nameEn: "Imbaba (General)" },
          { id: "giza-imbaba-el-moneib", nameAr: "المنيب", nameEn: "El Moneib" },
          { id: "giza-imbaba-el-sabtieh", nameAr: "السبتية", nameEn: "El Sabtieh" },
        ],
      },
      {
        id: "giza-warraq",
        nameAr: "الوراق",
        nameEn: "Warraq",
        subareas: [
          { id: "giza-warraq-main", nameAr: "الوراق (عام)", nameEn: "Warraq (General)" },
        ],
      },
      {
        id: "giza-bulaq-el-dakrour",
        nameAr: "بولاق الدكرور",
        nameEn: "Bulaq El Dakrour",
        subareas: [
          { id: "giza-bulaq-el-dakrour-main", nameAr: "بولاق الدكرور (عام)", nameEn: "Bulaq El Dakrour (General)" },
          { id: "giza-bulaq-el-dakrour-talbiya", nameAr: "طالبية (بولاق)", nameEn: "Talbiya (Bulaq)" },
        ],
      },
      {
        id: "giza-faisal",
        nameAr: "فيصل",
        nameEn: "Faisal",
        subareas: [
          { id: "giza-faisal-main", nameAr: "فيصل (عام)", nameEn: "Faisal (General)" },
          { id: "giza-faisal-st", nameAr: "شارع فيصل", nameEn: "Faisal Street" },
          { id: "giza-faisal-sakkara-rd", nameAr: "طريق سقارة", nameEn: "Sakkara Road" },
        ],
      },
      {
        id: "giza-haram",
        nameAr: "الهرم",
        nameEn: "Haram",
        subareas: [
          { id: "giza-haram-main", nameAr: "الهرم (عام)", nameEn: "Haram (General)" },
          { id: "giza-haram-pyramids-rd", nameAr: "شارع الهرم", nameEn: "Haram Street" },
          { id: "giza-haram-mansourieh", nameAr: "المنصورية", nameEn: "Mansourieh" },
          { id: "giza-haram-wahat-rd", nameAr: "طريق الواحات", nameEn: "Wahat Road" },
        ],
      },
      {
        id: "giza-giza-district",
        nameAr: "الجيزة",
        nameEn: "Giza",
        subareas: [
          { id: "giza-giza-main", nameAr: "الجيزة (عام)", nameEn: "Giza (General)" },
          { id: "giza-giza-corniche", nameAr: "كورنيش الجيزة", nameEn: "Giza Corniche" },
          { id: "giza-giza-sphinx-sq", nameAr: "ميدان السفنكس", nameEn: "Sphinx Square" },
        ],
      },
      {
        id: "giza-omrania",
        nameAr: "العمرانية",
        nameEn: "Omrania",
        subareas: [
          { id: "giza-omrania-main", nameAr: "العمرانية (عام)", nameEn: "Omrania (General)" },
          { id: "giza-omrania-new", nameAr: "العمرانية الجديدة", nameEn: "New Omrania" },
        ],
      },
      {
        id: "giza-talbia",
        nameAr: "طالبية",
        nameEn: "Talbia",
        subareas: [
          { id: "giza-talbia-main", nameAr: "طالبية (عام)", nameEn: "Talbia (General)" },
        ],
      },
      {
        id: "giza-kafr-tohormos",
        nameAr: "كفر طهرمس",
        nameEn: "Kafr Tohormos",
        subareas: [
          { id: "giza-kafr-tohormos-main", nameAr: "كفر طهرمس (عام)", nameEn: "Kafr Tohormos (General)" },
        ],
      },
      {
        id: "giza-hadayek-el-ahram",
        nameAr: "حدائق الأهرام",
        nameEn: "Hadayek El Ahram",
        subareas: [
          { id: "giza-hadayek-el-ahram-main", nameAr: "حدائق الأهرام (عام)", nameEn: "Hadayek El Ahram (General)" },
        ],
      },
      {
        id: "giza-6th-october",
        nameAr: "مدينة 6 أكتوبر",
        nameEn: "6th of October City",
        subareas: [
          { id: "giza-6oct-district-1", nameAr: "الحي الأول (6 أكتوبر)", nameEn: "First District" },
          { id: "giza-6oct-district-2", nameAr: "الحي الثاني (6 أكتوبر)", nameEn: "Second District" },
          { id: "giza-6oct-district-3", nameAr: "الحي الثالث (6 أكتوبر)", nameEn: "Third District" },
          { id: "giza-6oct-district-4", nameAr: "الحي الرابع (6 أكتوبر)", nameEn: "Fourth District" },
          { id: "giza-6oct-district-5", nameAr: "الحي الخامس (6 أكتوبر)", nameEn: "Fifth District" },
          { id: "giza-6oct-district-6", nameAr: "الحي السادس (6 أكتوبر)", nameEn: "Sixth District" },
          { id: "giza-6oct-district-7", nameAr: "الحي السابع (6 أكتوبر)", nameEn: "Seventh District" },
          { id: "giza-6oct-district-8", nameAr: "الحي الثامن (6 أكتوبر)", nameEn: "Eighth District" },
          { id: "giza-6oct-district-9", nameAr: "الحي التاسع (6 أكتوبر)", nameEn: "Ninth District" },
          { id: "giza-6oct-district-10", nameAr: "الحي العاشر (6 أكتوبر)", nameEn: "Tenth District" },
          { id: "giza-6oct-district-11", nameAr: "الحي الحادي عشر (6 أكتوبر)", nameEn: "Eleventh District" },
          { id: "giza-6oct-district-12", nameAr: "الحي الثاني عشر (6 أكتوبر)", nameEn: "Twelfth District" },
          { id: "giza-6oct-district-13", nameAr: "الحي الثالث عشر (6 أكتوبر)", nameEn: "Thirteenth District" },
          { id: "giza-6oct-district-14", nameAr: "الحي الرابع عشر (6 أكتوبر)", nameEn: "Fourteenth District" },
          { id: "giza-6oct-west-somid", nameAr: "غرب الصميد", nameEn: "West Somid" },
          { id: "giza-6oct-east-somid", nameAr: "شرق الصميد", nameEn: "East Somid" },
          { id: "giza-6oct-north-expansion", nameAr: "التوسعات الشمالية", nameEn: "Northern Expansions" },
          { id: "giza-6oct-south-expansion", nameAr: "التوسعات الجنوبية", nameEn: "Southern Expansions" },
          { id: "giza-6oct-industrial", nameAr: "المنطقة الصناعية", nameEn: "Industrial Area" },
          { id: "giza-6oct-central", nameAr: "المنطقة المركزية", nameEn: "Central Area" },
          { id: "giza-6oct-beverley-hills", nameAr: "بيفرلي هيلز", nameEn: "Beverly Hills" },
          { id: "giza-6oct-gardenia", nameAr: "الجاردينيا", nameEn: "Gardenia" },
        ],
      },
      {
        id: "giza-sheikh-zayed",
        nameAr: "مدينة الشيخ زايد",
        nameEn: "Sheikh Zayed City",
        subareas: [
          { id: "giza-sheikh-zayed-main", nameAr: "الشيخ زايد (عام)", nameEn: "Sheikh Zayed (General)" },
          { id: "giza-sheikh-zayed-district-1", nameAr: "الحي الأول (الشيخ زايد)", nameEn: "First District (Sheikh Zayed)" },
          { id: "giza-sheikh-zayed-district-2", nameAr: "الحي الثاني (الشيخ زايد)", nameEn: "Second District (Sheikh Zayed)" },
          { id: "giza-sheikh-zayed-wadi-el-neel", nameAr: "وادي النيل", nameEn: "Wadi El Neel" },
          { id: "giza-sheikh-zayed-el-nozha", nameAr: "النزهة (الشيخ زايد)", nameEn: "El Nozha (Sheikh Zayed)" },
          { id: "giza-sheikh-zayed-compound", nameAr: "الكمباوندات", nameEn: "Compounds" },
        ],
      },
      {
        id: "giza-hadayek-october",
        nameAr: "حدائق أكتوبر",
        nameEn: "Hadayek October",
        subareas: [
          { id: "giza-hadayek-october-main", nameAr: "حدائق أكتوبر (عام)", nameEn: "Hadayek October (General)" },
        ],
      },
      {
        id: "giza-new-october",
        nameAr: "أكتوبر الجديدة",
        nameEn: "New October",
        subareas: [
          { id: "giza-new-october-main", nameAr: "أكتوبر الجديدة (عام)", nameEn: "New October (General)" },
        ],
      },
      {
        id: "giza-west-somid",
        nameAr: "غرب الصميد",
        nameEn: "West Somid",
        subareas: [
          { id: "giza-west-somid-main", nameAr: "غرب الصميد (عام)", nameEn: "West Somid (General)" },
        ],
      },
    ],
  },
];

