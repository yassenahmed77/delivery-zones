// ============================================================
// Delivery Areas Data File - Accurate Egypt Delivery Geography
// القاهرة والجيزة - التقسيم الجغرافي الواقعي لقطاع توصيل الطلبات
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
    nameAr: "محافظة القاهرة",
    nameEn: "Cairo",
    mainAreas: [
      {
        id: "cairo-nasr-city",
        nameAr: "مدينة نصر",
        nameEn: "Nasr City",
        subareas: [
          { id: "nc-abbas-el-akkad", nameAr: "شارع عباس العقاد", nameEn: "Abbas El Akkad" },
          { id: "nc-makram-ebeid", nameAr: "شارع مكرم عبيد", nameEn: "Makram Ebeid" },
          { id: "nc-mostafa-el-nahas", nameAr: "شارع مصطفى النحاس", nameEn: "Mostafa El Nahas" },
          { id: "nc-el-tayaran", nameAr: "شارع الطيران ومحيط رابعة", nameEn: "El Tayaran" },
          { id: "nc-ahmed-el-zomor", nameAr: "شارع أحمد الزمر (ذاكر حسين)", nameEn: "Ahmed El Zomor" },
          { id: "nc-emtedad-ramses", nameAr: "امتداد رمسيس ومحيط الاستاد", nameEn: "Emtedad Ramses" },
          { id: "nc-zahraa", nameAr: "زهراء مدينة نصر", nameEn: "Zahraa Nasr City" },
          { id: "nc-free-zone", nameAr: "المنطقة الحرة السابعة", nameEn: "Free Zone" },
          { id: "nc-district-1", nameAr: "الحي الأول", nameEn: "1st District" },
          { id: "nc-district-2", nameAr: "الحي الثاني", nameEn: "2nd District" },
          { id: "nc-district-3", nameAr: "الحي الثالث", nameEn: "3rd District" },
          { id: "nc-district-4", nameAr: "الحي الرابع", nameEn: "4th District" },
          { id: "nc-district-5", nameAr: "الحي الخامس", nameEn: "5th District" },
          { id: "nc-district-6", nameAr: "الحي السادس", nameEn: "6th District" },
          { id: "nc-district-7", nameAr: "الحي السابع", nameEn: "7th District" },
          { id: "nc-district-8", nameAr: "الحي الثامن", nameEn: "8th District" },
          { id: "nc-district-9", nameAr: "الحي التاسع", nameEn: "9th District" },
          { id: "nc-district-10", nameAr: "الحي العاشر", nameEn: "10th District" },
          { id: "nc-district-11", nameAr: "الحي الحادي عشر", nameEn: "11th District" },
          { id: "nc-swiss-area", nameAr: "المنطقة السويسرية والوفاء والأمل", nameEn: "Swiss Area" },
        ],
      },
      {
        id: "cairo-new-cairo",
        nameAr: "القاهرة الجديدة / التجمع",
        nameEn: "New Cairo",
        subareas: [
          { id: "tag-5th-settlement", nameAr: "التجمع الخامس (الحي الأول - الخامس)", nameEn: "5th Settlement" },
          { id: "tag-1st-settlement", nameAr: "التجمع الأول", nameEn: "1st Settlement" },
          { id: "tag-3rd-settlement", nameAr: "التجمع الثالث", nameEn: "3rd Settlement" },
          { id: "tag-narges", nameAr: "النرجس (فيلات وعمارات)", nameEn: "Narges" },
          { id: "tag-new-narges", nameAr: "النرجس الجديدة", nameEn: "New Narges" },
          { id: "tag-banafseg", nameAr: "البنفسج", nameEn: "Banafseg" },
          { id: "tag-yasmeen", nameAr: "الياسمين", nameEn: "Yasmeen" },
          { id: "tag-koronfel", nameAr: "القرنفل", nameEn: "Koronfel" },
          { id: "tag-andalus", nameAr: "الأندلس", nameEn: "Andalus" },
          { id: "tag-north-academy", nameAr: "شمال الأكاديمية", nameEn: "North Academy" },
          { id: "tag-south-academy", nameAr: "جنوب الأكاديمية", nameEn: "South Academy" },
          { id: "tag-north-investors", nameAr: "المستثمرين الشمالية", nameEn: "North Investors" },
          { id: "tag-south-investors", nameAr: "المستثمرين الجنوبية", nameEn: "South Investors" },
          { id: "tag-beit-el-watan", nameAr: "بيت الوطن", nameEn: "Beit El Watan" },
          { id: "tag-north-lotus", nameAr: "اللوتس الشمالية", nameEn: "North Lotus" },
          { id: "tag-south-lotus", nameAr: "اللوتس الجنوبية", nameEn: "South Lotus" },
          { id: "tag-rehab", nameAr: "مدينة الرحاب", nameEn: "Al Rehab City" },
          { id: "tag-madinaty", nameAr: "مدينتي", nameEn: "Madinaty" },
          { id: "tag-golden-square", nameAr: "الميدان الذهبي (Golden Square)", nameEn: "Golden Square" },
          { id: "tag-90-north", nameAr: "شارع التسعين الشمالي", nameEn: "90th North St" },
          { id: "tag-90-south", nameAr: "شارع التسعين الجنوبي", nameEn: "90th South St" },
          { id: "tag-choueifat", nameAr: "حي الشويفات", nameEn: "Choueifat" },
        ],
      },
      {
        id: "cairo-heliopolis",
        nameAr: "مصر الجديدة / هليوبوليس",
        nameEn: "Heliopolis",
        subareas: [
          { id: "helio-korba", nameAr: "الكوربة", nameEn: "Korba" },
          { id: "helio-roxy", nameAr: "ميدan روكسي", nameEn: "Roxy" },
          { id: "helio-merghani", nameAr: "شارع الميرغني", nameEn: "Merghani" },
          { id: "helio-hegaz", nameAr: "ميدان وشارع الحجاز", nameEn: "Hegaz" },
          { id: "helio-triumph", nameAr: "ميدان تريومف", nameEn: "Triumph" },
          { id: "helio-ard-el-golf", nameAr: "أرض الجولف", nameEn: "Ard El Golf" },
          { id: "helio-almaza", nameAr: "ألماظة", nameEn: "Almaza" },
          { id: "helio-sheraton", nameAr: "مساكن شيراتون المطار", nameEn: "Sheraton Heliopolis" },
          { id: "helio-nozha", nameAr: "النزهة الجديدة", nameEn: "New Nozha" },
        ],
      },
      {
        id: "cairo-maadi",
        nameAr: "المعادي",
        nameEn: "Maadi",
        subareas: [
          { id: "maadi-sarayat", nameAr: "المعادي السرايات", nameEn: "Sarayat El Maadi" },
          { id: "maadi-degla", nameAr: "دجلة المعادي", nameEn: "Degla Maadi" },
          { id: "maadi-old", nameAr: "المعادي القديمة", nameEn: "Old Maadi" },
          { id: "maadi-new", nameAr: "المعادي الجديدة", nameEn: "New Maadi" },
          { id: "maadi-laselky", nameAr: "شارع اللاسلكي والنصر", nameEn: "El Laselky & El Nasr" },
          { id: "maadi-corniche", nameAr: "كورنيش المعادي وأبراج عثمان", nameEn: "Maadi Corniche" },
          { id: "maadi-zahraa", nameAr: "زهراء المعادي وكارفور", nameEn: "Zahraa El Maadi" },
          { id: "maadi-autostrad", nameAr: "محيط الأوتوستراد وصقر قريش", nameEn: "Saqr Quraish" },
        ],
      },
      {
        id: "cairo-mokattam",
        nameAr: "المقطم",
        nameEn: "Mokattam",
        subareas: [
          { id: "mok-upper-plateau", nameAr: "الهضبة العليا وشارع 9", nameEn: "Upper Plateau & St 9" },
          { id: "mok-nafoura", nameAr: "ميدان النافورة ومحيطه", nameEn: "Nafoura Square" },
          { id: "mok-mid-plateau", nameAr: "الهضبة الوسطى (كافة الأحياء)", nameEn: "Middle Plateau" },
          { id: "mok-asmarat", nameAr: "حي الأسمرات", nameEn: "Asmarat" },
          { id: "mok-uptown", nameAr: "أب تاون كايرو ومحيطه", nameEn: "Uptown Cairo" },
        ],
      },
      {
        id: "cairo-downtown",
        nameAr: "وسط البلد",
        nameEn: "Downtown Cairo",
        subareas: [
          { id: "dt-tahrir", nameAr: "ميدان التحرير", nameEn: "Tahrir Square" },
          { id: "dt-talaat-harb", nameAr: "طلعت حرب وميدان الفلكي", nameEn: "Talaat Harb" },
          { id: "dt-bab-el-louk", nameAr: "باب اللوق وعابدين", nameEn: "Bab El Louk & Abdeen" },
          { id: "dt-qasr-el-nil", nameAr: "قصر النيل وشارع شامبليون", nameEn: "Qasr El Nil" },
          { id: "dt-ramses", nameAr: "ميدان رمسيس ومحطة مصر", nameEn: "Ramses Square" },
          { id: "dt-attaba", nameAr: "العتبة والموسكي", nameEn: "Attaba & Muski" },
        ],
      },
      {
        id: "cairo-zamalek",
        nameAr: "الزمالك",
        nameEn: "Zamalek",
        subareas: [
          { id: "zamalek-north", nameAr: "شمال الزمالك (شارع 26 يوليو وماريوت)", nameEn: "North Zamalek" },
          { id: "zamalek-south", nameAr: "جنوب الزمالك (حسن صبري والجزيرة)", nameEn: "South Zamalek" },
          { id: "zamalek-abu-el-feda", nameAr: "شارع أبو الفدا والكورنيش", nameEn: "Abu El Feda & Corniche" },
          { id: "zamalek-brazil-st", nameAr: "شارع البرازيل ومحيط السفارات", nameEn: "Brazil Street" },
        ],
      },
      {
        id: "cairo-garden-city",
        nameAr: "جاردن سيتي",
        nameEn: "Garden City",
        subareas: [
          { id: "gc-main", nameAr: "جاردن سيتي القديمة والسفارات", nameEn: "Garden City Center" },
          { id: "gc-corniche", nameAr: "كورنيش جاردن سيتي وقصر الدوبارة", nameEn: "Garden City Corniche" },
          { id: "gc-qasr-el-aini", nameAr: "محيط شارع القصر العيني", nameEn: "Qasr El Aini St" },
        ],
      },
      {
        id: "cairo-manial",
        nameAr: "المنيل",
        nameEn: "Manial",
        subareas: [
          { id: "manial-roda", nameAr: "منيل الروضة ومحيط متحف قصر المنيل", nameEn: "Manial El Roda" },
          { id: "manial-main-st", nameAr: "شارع المنيل الرئيسي", nameEn: "Main Manial Street" },
          { id: "manial-qasr-aini", nameAr: "محيط القصر العيني الفرنساوي والجامعة", nameEn: "French Qasr Aini" },
        ],
      },
      {
        id: "cairo-sayeda-zeinab",
        nameAr: "السيدة زينب",
        nameEn: "Sayeda Zeinab",
        subareas: [
          { id: "sz-square", nameAr: "ميدان ومسجد السيدة زينب", nameEn: "Sayeda Zeinab Square" },
          { id: "sz-port-said", nameAr: "شارع بورسعيد", nameEn: "Port Said St" },
          { id: "sz-khedewy", nameAr: "الشارع الجديد ومحيط مدرسة الخديوية", nameEn: "El Khedewy Area" },
        ],
      },
      {
        id: "cairo-old-cairo",
        nameAr: "مصر القديمة",
        nameEn: "Old Cairo",
        subareas: [
          { id: "oc-fustat", nameAr: "الفسطاط ومتحف الحضارة", nameEn: "Fustat" },
          { id: "oc-religions-complex", nameAr: "مجمع الأديان وماري جرجس", nameEn: "Religions Complex" },
          { id: "oc-athr-el-naby", nameAr: "أثر النبي والكورنيش", nameEn: "Athr El Naby" },
        ],
      },
      {
        id: "cairo-shubra",
        nameAr: "شبرا مصر",
        nameEn: "Shubra",
        subareas: [
          { id: "shubra-main-st", nameAr: "شارع شبرا الرئيسي وميدان فيكتوريا", nameEn: "Shubra Main St" },
          { id: "shubra-massarra", nameAr: "مسرة وخلوصي", nameEn: "Massarra" },
          { id: "shubra-rodd-farag-sq", nameAr: "شارع أحمد حلمي وميدان الأفضل", nameEn: "Ahmed Helmy" },
          { id: "shubra-teraa-boulakia", nameAr: "شارع ترعة بولاقية", nameEn: "Boulakia Canal St" },
        ],
      },
      {
        id: "cairo-rod-el-farag",
        nameAr: "روض الفرج",
        nameEn: "Rod El Farag",
        subareas: [
          { id: "rf-main", nameAr: "شارع روض الفرج وميدان فيكتوريا", nameEn: "Rod El Farag St" },
          { id: "rf-tosson", nameAr: "شارع طوسون والفريد", nameEn: "Tosson" },
          { id: "rf-gezerat-badran", nameAr: "جزيرة بدران وسوق روض الفرج", nameEn: "Geziret Badran" },
          { id: "rf-corniche", nameAr: "كورنيش النيل بروض الفرج", nameEn: "Corniche Rod El Farag" },
        ],
      },
      {
        id: "cairo-sahel",
        nameAr: "الساحل",
        nameEn: "Sahel",
        subareas: [
          { id: "sahel-khalafawy", nameAr: "الخلفاوي", nameEn: "El Khalafawy" },
          { id: "sahel-mazallat", nameAr: "المظلات", nameEn: "El Mazallat" },
          { id: "sahel-corniche", nameAr: "كورنيش الساحل وأبراج أغاخان", nameEn: "Aghakhan & Corniche" },
        ],
      },
      {
        id: "cairo-zeitoun",
        nameAr: "الزيتون وحلمية الزيتون",
        nameEn: "Zeitoun",
        subareas: [
          { id: "zeitoun-east", nameAr: "الزيتون الشرقية وميدان المحطة", nameEn: "East Zeitoun" },
          { id: "zeitoun-west", nameAr: "الزيتون الغربية وسنان باشا", nameEn: "West Zeitoun" },
          { id: "zeitoun-helmiya", nameAr: "حلمية الزيتون وميدان ابن سندر", nameEn: "Helmiyet El Zeitoun" },
          { id: "zeitoun-saray-qobba", nameAr: "سراي القبة", nameEn: "Saray El Qobba" },
        ],
      },
      {
        id: "cairo-hadayek-el-qobba",
        nameAr: "حدائق القبة",
        nameEn: "Hadayek El Qobba",
        subareas: [
          { id: "hq-misr-sudan", nameAr: "شارع مصر والسودان", nameEn: "Misr Wa Sudan St" },
          { id: "hq-kobri-qobba", nameAr: "كوبري القبة ومحيط القصر", nameEn: "Kobri El Qobba" },
          { id: "hq-wayli-kabir", nameAr: "الوايلي الكبير", nameEn: "El Wayli El Kabir" },
          { id: "hq-sikka-baida", nameAr: "السكة البيضاء والديوان", nameEn: "El Sikka El Baida" },
        ],
      },
      {
        id: "cairo-el-zawya-el-hamra",
        nameAr: "الزاوية الحمراء",
        nameEn: "El Zawya El Hamra",
        subareas: [
          { id: "zh-madinet-el-noor", nameAr: "مدينة النور ومساكن الزاوية", nameEn: "Madinet El Noor" },
          { id: "zh-old-zawya", nameAr: "الزاوية القديمة وشارع الشركات", nameEn: "Old Zawya" },
        ],
      },
      {
        id: "cairo-el-daher",
        nameAr: "الظاهر والفجالة",
        nameEn: "El Daher & Faggala",
        subareas: [
          { id: "daher-midan", nameAr: "ميدان الظاهر وبيبرس", nameEn: "Daher Square" },
          { id: "daher-faggala", nameAr: "شارع الفجالة وكلوت بك", nameEn: "Faggala" },
          { id: "daher-ghmara", nameAr: "غمرة ومحيط المستشفى القبطي", nameEn: "Ghamra" },
        ],
      },
      {
        id: "cairo-abbassia",
        nameAr: "العباسية",
        nameEn: "Abbassia",
        subareas: [
          { id: "abb-square", nameAr: "ميدان العباسية ومحيط الجامعة", nameEn: "Abbassia Square" },
          { id: "abb-mansheyat-el-sadr", nameAr: "منشية الصدر وجامعة عين شمس", nameEn: "Mansheyat El Sadr" },
          { id: "abb-el-geish-st", nameAr: "شارع الجيش والوايلي", nameEn: "El Geish St" },
        ],
      },
      {
        id: "cairo-ain-shams",
        nameAr: "عين شمس",
        nameEn: "Ain Shams",
        subareas: [
          { id: "as-east", nameAr: "عين شمس الشرقية وأحمد عصمت", nameEn: "East Ain Shams" },
          { id: "as-west", nameAr: "عين شمس الغربية وميدان النعام", nameEn: "West Ain Shams" },
          { id: "as-masaken", nameAr: "مساكن عين شمس ومنشية التحرير", nameEn: "Ain Shams Housing" },
          { id: "as-zahraa", nameAr: "زهراء عين شمس", nameEn: "Zahraa Ain Shams" },
        ],
      },
      {
        id: "cairo-matariya",
        nameAr: "المطرية",
        nameEn: "Matariya",
        subareas: [
          { id: "mat-square", nameAr: "ميدان المطرية ومحيط الشجرة", nameEn: "Matariya Square" },
          { id: "mat-trolley", nameAr: "شارع التروللي والبلسم", nameEn: "Trolley St" },
          { id: "mat-petrol", nameAr: "شارع البترول والمسلة", nameEn: "Petrol St" },
        ],
      },
      {
        id: "cairo-marg",
        nameAr: "المرج وعزبة النخل",
        nameEn: "Marg",
        subareas: [
          { id: "marg-old", nameAr: "المرج القديمة ومحطة المترو", nameEn: "Old Marg" },
          { id: "marg-new", nameAr: "المرج الجديدة ومؤسسة الزكاة", nameEn: "New Marg" },
          { id: "marg-ezbet-nakhl", nameAr: "عزبة النخل الشرقية والغربية", nameEn: "Ezbet El Nakhl" },
        ],
      },
      {
        id: "cairo-salam",
        nameAr: "مدينة السلام",
        nameEn: "Salam City",
        subareas: [
          { id: "salam-atlas", nameAr: "مساكن أطلس والعبد", nameEn: "Atlas & El Abd" },
          { id: "salam-ispico", nameAr: "منطقة إسبيكو ومحطة أمان", nameEn: "Ispico" },
          { id: "salam-herfyeen", nameAr: "مدينة الحرفيين", nameEn: "Herfyeen City" },
        ],
      },
      {
        id: "cairo-gesr-el-suez",
        nameAr: "جسر السويس",
        nameEn: "Gesr El Suez",
        subareas: [
          { id: "gesr-alef-maskan", nameAr: "الألف مسكن وميدان الحجاز الجديد", nameEn: "Alef Maskan" },
          { id: "gesr-nozha-2", nameAr: "النزهة 2 وحي السلام", nameEn: "Nozha 2" },
          { id: "gesr-badr-park", nameAr: "محيط حديقة بدر وشارع الأربعين", nameEn: "Badr Park Area" },
          { id: "gesr-qobaa", nameAr: "منطقة قباء وشارع الخمسين", nameEn: "Qobaa" },
        ],
      },
      {
        id: "cairo-dar-el-salam",
        nameAr: "دار السلام",
        nameEn: "Dar El Salam",
        subareas: [
          { id: "ds-main", nameAr: "شارع الفيوم وميدان دار السلام", nameEn: "Fayoum St & Square" },
          { id: "ds-corniche", nameAr: "كورنيش دار السلام ومحيط الكوبري", nameEn: "Dar El Salam Corniche" },
          { id: "ds-ahmed-zaki", nameAr: "شارع أحمد زكي", nameEn: "Ahmed Zaki St" },
        ],
      },
      {
        id: "cairo-basateen",
        nameAr: "البساتين",
        nameEn: "Basateen",
        subareas: [
          { id: "bas-sharqia", nameAr: "البساتين الشرقية وميدان الساعة", nameEn: "East Basateen" },
          { id: "bas-gharbia", nameAr: "البساتين الغربية وبئر أم سلطان", nameEn: "West Basateen" },
          { id: "bas-fayda-kamel", nameAr: "شارع فايدة كامل", nameEn: "Fayda Kamel St" },
        ],
      },
      {
        id: "cairo-helwan",
        nameAr: "حلوان",
        nameEn: "Helwan",
        subareas: [
          { id: "helwan-center", nameAr: "وسط حلوان ومحيط المحطة والشارع الغربي", nameEn: "Helwan Center" },
          { id: "helwan-ain", nameAr: "عين حلوان ومحيط كابريتاج", nameEn: "Ain Helwan" },
          { id: "helwan-hadayek", nameAr: "حدائق حلوان ووادي حوف", nameEn: "Hadayek Helwan & Wadi Houf" },
          { id: "helwan-american-project", nameAr: "المشروع الأمريكي والجامعة", nameEn: "American Project" },
        ],
      },
      {
        id: "cairo-15-may",
        nameAr: "مدينة 15 مايو",
        nameEn: "15 May City",
        subareas: [
          { id: "15m-phase-1", nameAr: "المجاورات الأولى (1 - 12)", nameEn: "Phase 1 (1-12)" },
          { id: "15m-phase-2", nameAr: "المجاورات الثانية (13 - 24)", nameEn: "Phase 2 (13-24)" },
          { id: "15m-business", nameAr: "حي رجال الأعمال والامتداد", nameEn: "Business District" },
        ],
      },
      {
        id: "cairo-obour",
        nameAr: "مدينة العبور",
        nameEn: "Obour City",
        subareas: [
          { id: "obour-districts-1-5", nameAr: "الأحياء من الأول إلى الخامس", nameEn: "Districts 1-5" },
          { id: "obour-districts-6-9", nameAr: "الأحياء من السادس إلى التاسع", nameEn: "Districts 6-9" },
          { id: "obour-golf-city", nameAr: "جولف سيتي وكارفور العبور", nameEn: "Golf City" },
          { id: "obour-industrial", nameAr: "المنطقة الصناعية (أ، ب، ج)", nameEn: "Industrial Area" },
        ],
      },
      {
        id: "cairo-shorouk",
        nameAr: "مدينة الشروق",
        nameEn: "Shorouk City",
        subareas: [
          { id: "shorouk-phase-1", nameAr: "الأحياء السكنية (الأول، الثاني، الثالث)", nameEn: "Districts 1-3" },
          { id: "shorouk-phase-2", nameAr: "الأحياء السكنية (الرابع، الخامس، السابع)", nameEn: "Districts 4-7" },
          { id: "shorouk-clubs", nameAr: "منطقة النوادي والجامعة البريطانية", nameEn: "Clubs & BUE Area" },
        ],
      },
      {
        id: "cairo-badr",
        nameAr: "مدينة بدر",
        nameEn: "Badr City",
        subareas: [
          { id: "badr-housing", nameAr: "الحي المتميز وحي الفردوس", nameEn: "Badr Housing" },
          { id: "badr-safwa", nameAr: "حي الصفوة وزهرة العاصمة", nameEn: "Safwa District" },
          { id: "badr-industrial", nameAr: "المنطقة الصناعية بالروبيكي", nameEn: "Badr Industrial" },
        ],
      },
      {
        id: "cairo-new-capital",
        nameAr: "العاصمة الإدارية الجديدة",
        nameEn: "New Administrative Capital",
        subareas: [
          { id: "nac-r1-r2", nameAr: "الأحياء السكنية R1 و R2", nameEn: "Residential R1 & R2" },
          { id: "nac-r3", nameAr: "الحي السكني R3 (كابيتال ريزيدنس)", nameEn: "Residential R3" },
          { id: "nac-r5", nameAr: "الحي السكني R5 (جاردن سيتي الجديدة)", nameEn: "Residential R5" },
          { id: "nac-r7", nameAr: "الحي السكني R7 والمستثمرين", nameEn: "Residential R7" },
          { id: "nac-gov-district", nameAr: "الحي الحكومي ومجلس النواب", nameEn: "Government District" },
          { id: "nac-cbd", nameAr: "منطقة الأعمال المركزية (البرج الأيقوني)", nameEn: "CBD (Iconic Tower)" },
          { id: "nac-downtown", nameAr: "منطقة الداون تاون (Down Town)", nameEn: "Downtown NAC" },
        ],
      },
    ],
  },
  {
    id: "giza",
    nameAr: "محافظة الجيزة",
    nameEn: "Giza",
    mainAreas: [
      {
        id: "giza-mohandessin",
        nameAr: "المهندسين",
        nameEn: "Mohandessin",
        subareas: [
          { id: "moh-gameat-dowal", nameAr: "شارع جامعة الدول العربية ومحيطه", nameEn: "Arab League St" },
          { id: "moh-lebanon-sq", nameAr: "ميدان لبنان وشارع لبنان", nameEn: "Lebanon Square" },
          { id: "moh-shehab-suria", nameAr: "شارع شهاب وشارع سوريا", nameEn: "Shehab & Syria St" },
          { id: "moh-batal-ahmed", nameAr: "شارع البطل أحمد عبد العزيز", nameEn: "Batal Ahmed Abdel Aziz" },
          { id: "moh-gezerat-arab", nameAr: "شارع جزيرة العرب ووادي النيل", nameEn: "Geziret El Arab" },
          { id: "moh-meet-oqba", nameAr: "ميت عقبة ونادي الزمالك", nameEn: "Meet Oqba" },
        ],
      },
      {
        id: "giza-dokki",
        nameAr: "الدقي",
        nameEn: "Dokki",
        subareas: [
          { id: "dokki-tahrir-st", nameAr: "شارع التحرير وميدان الدقي", nameEn: "Tahrir St & Dokki Sq" },
          { id: "dokki-mossadak", nameAr: "شارع مصدق", nameEn: "Mossadak St" },
          { id: "dokki-mohy-el-din", nameAr: "شارع محيي الدين أبو العز", nameEn: "Mohy El Din Abu El Ezz" },
          { id: "dokki-mesaha", nameAr: "ميدان المساحة وشارع عمان", nameEn: "Mesaha Square" },
          { id: "dokki-bain-sarayat", nameAr: "بين السرايات وجامعة القاهرة", nameEn: "Bain El Sarayat" },
        ],
      },
      {
        id: "giza-agouza",
        nameAr: "العجوزة",
        nameEn: "Agouza",
        subareas: [
          { id: "agouza-corniche", nameAr: "كورنيش النيل بالعجوزة ومستشفى العجوزة", nameEn: "Agouza Corniche" },
          { id: "agouza-sphinx", nameAr: "ميدان سفنكس وشارع أحمد عرابي", nameEn: "Sphinx Square" },
          { id: "agouza-abdel-moneim", nameAr: "شارع عبد المنعم رياض ونادي الترسانة", nameEn: "Abdel Moneim Riad St" },
        ],
      },
      {
        id: "giza-6th-october",
        nameAr: "مدينة 6 أكتوبر",
        nameEn: "6th of October City",
        subareas: [
          { id: "oct-district-1", nameAr: "الحي الأول", nameEn: "1st District" },
          { id: "oct-district-2", nameAr: "الحي الثاني", nameEn: "2nd District" },
          { id: "oct-district-3", nameAr: "الحي الثالث", nameEn: "3rd District" },
          { id: "oct-district-4", nameAr: "الحي الرابع", nameEn: "4th District" },
          { id: "oct-district-5", nameAr: "الحي الخامس", nameEn: "5th District" },
          { id: "oct-district-6", nameAr: "الحي السادس وشارع الكفراوي", nameEn: "6th District" },
          { id: "oct-district-7", nameAr: "الحي السابع وميدان الحصري", nameEn: "7th District (Hosary)" },
          { id: "oct-district-8", nameAr: "الحي الثامن", nameEn: "8th District" },
          { id: "oct-district-9", nameAr: "الحي التاسع", nameEn: "9th District" },
          { id: "oct-district-10", nameAr: "الحي العاشر", nameEn: "10th District" },
          { id: "oct-district-11", nameAr: "الحي الحادي عشر", nameEn: "11th District" },
          { id: "oct-district-12", nameAr: "الحي الثاني عشر", nameEn: "12th District" },
          { id: "oct-west-somid", nameAr: "غرب سوميد (المجاورات وفيلات)", nameEn: "West Somid" },
          { id: "oct-east-somid", nameAr: "شرق سوميد ومحور 26 يوليو", nameEn: "East Somid" },
          { id: "oct-north-expansions", nameAr: "التوسعات الشمالية ومحيط مول العرب", nameEn: "Northern Expansions" },
          { id: "oct-south-expansions", nameAr: "التوسعات الجنوبية وميدان النجدة", nameEn: "Southern Expansions" },
          { id: "oct-industrial", nameAr: "المنطقة الصناعية (المراحل 1 - 6)", nameEn: "Industrial Zone" },
          { id: "oct-motamayez", nameAr: "الحي المتميز وجامعة مصر", nameEn: "Motamayez District" },
        ],
      },
      {
        id: "giza-sheikh-zayed",
        nameAr: "مدينة الشيخ زايد",
        nameEn: "Sheikh Zayed City",
        subareas: [
          { id: "zayed-districts-1-4", nameAr: "الأحياء السكنية (الأول، الثاني، الثالث، الرابع)", nameEn: "Districts 1-4" },
          { id: "zayed-districts-5-9", nameAr: "الأحياء السكنية (الخامس، السابع، الثامن، التاسع)", nameEn: "Districts 5-9" },
          { id: "zayed-districts-10-16", nameAr: "الأحياء السكنية (العاشر، الحادي عشر، الرابع عشر، السادس عشر)", nameEn: "Districts 10-16" },
          { id: "zayed-zayed-2000", nameAr: "حي الشيخ زايد 2000 والحديقة الدولية", nameEn: "Zayed 2000" },
          { id: "zayed-beverly-hills", nameAr: "بيفرلي هيلز ومحيط سوديك", nameEn: "Beverly Hills" },
          { id: "zayed-khamael", nameAr: "الخمائل ومحيط المحور المركزي", nameEn: "Khamael Area" },
          { id: "zayed-green-belt", nameAr: "الحزام الأخضر والامتدادات الحديثة", nameEn: "Green Belt" },
        ],
      },
      {
        id: "giza-hadayek-el-ahram",
        nameAr: "حدائق الأهرام",
        nameEn: "Hadayek El Ahram",
        subareas: [
          { id: "ha-gate-1", nameAr: "البوابة الأولى (بوابة خوفو - أ، ب، ج)", nameEn: "Gate 1 (Khufu)" },
          { id: "ha-gate-2", nameAr: "البوابة الثانية (بوابة خفرع - د، هـ)", nameEn: "Gate 2 (Khafre)" },
          { id: "ha-gate-3", nameAr: "البوابة الثالثة (بوابة منقرع - و، ز)", nameEn: "Gate 3 (Menkaure)" },
          { id: "ha-gate-4", nameAr: "البوابة الرابعة (بوابة مينا - ح، ط، ك)", nameEn: "Gate 4 (Mena)" },
          { id: "ha-pressure-area", nameAr: "منطقة الضغط العالي والشارع الجديد", nameEn: "High Pressure St" },
        ],
      },
      {
        id: "giza-faisal",
        nameAr: "فيصل",
        nameEn: "Faisal",
        subareas: [
          { id: "fsl-main-street", nameAr: "شارع فيصل الرئيسي (من الجيزة للمشعل)", nameEn: "Faisal Main St" },
          { id: "fsl-eshreen", nameAr: "شارع العشرين والأربعين", nameEn: "Eshreen St" },
          { id: "fsl-hassan-mohamed", nameAr: "حسن محمد وشارع ضياء", nameEn: "Hassan Mohamed" },
          { id: "fsl-matbaa", nameAr: "المطبعة ومحطة المساحة", nameEn: "El Matbaa" },
          { id: "fsl-taawon", nameAr: "التعاون ومحطة مدكور", nameEn: "El Taawon & Madkour" },
          { id: "fsl-tawabe2", nameAr: "الطوابق وكفر غطاطي", nameEn: "El Tawabe2" },
          { id: "fsl-masaken-dobat", nameAr: "مساكن الضباط والرماية", nameEn: "Officers Housing" },
        ],
      },
      {
        id: "giza-haram",
        nameAr: "الهرم",
        nameEn: "Haram",
        subareas: [
          { id: "hrm-main-street", nameAr: "شارع الهرم الرئيسي (كامل القطاع)", nameEn: "Haram Main St" },
          { id: "hrm-areesh", nameAr: "شارع العريش", nameEn: "El Areesh St" },
          { id: "hrm-nasr-eldin", nameAr: "نصر الدين ومحافظة الجيزة", nameEn: "Nasr El Din" },
          { id: "hrm-terssa", nameAr: "شارع ترسا (محمد أنور السادات)", nameEn: "Terssa St" },
          { id: "hrm-kom-akhdar", nameAr: "الكوم الأخضر والوفاء والأمل", nameEn: "Kom El Akhdar" },
          { id: "hrm-meshal", nameAr: "محطة مشعل ومحيط الأهرامات", nameEn: "Meshal & Pyramids" },
          { id: "hrm-mansoureya", nameAr: "طريق المنصورية وشبرامنت", nameEn: "Mansoureya Road" },
        ],
      },
      {
        id: "giza-giza-district",
        nameAr: "حي الجيزة والمنيب",
        nameEn: "Giza District",
        subareas: [
          { id: "gz-midan", nameAr: "ميدان الجيزة وشارع المحطة", nameEn: "Giza Square" },
          { id: "gz-mourad-st", nameAr: "شارع مراد وشارع الأهرام بداية", nameEn: "Mourad St" },
          { id: "gz-bahr-aazam", nameAr: "شارع البحر الأعظم وكورنيش النيل", nameEn: "Bahr El Aazam St" },
          { id: "gz-moneib", nameAr: "المنيب ومحيط الدائري ومحطة المترو", nameEn: "El Moneib" },
          { id: "gz-saqyet-maki", nameAr: "ساقية مكي وجزيرة الذهب", nameEn: "Saqyet Maki" },
        ],
      },
      {
        id: "giza-omrania",
        nameAr: "العمرانية",
        nameEn: "Omrania",
        subareas: [
          { id: "omr-sharqia", nameAr: "العمرانية الشرقية", nameEn: "East Omrania" },
          { id: "omr-gharbia", nameAr: "العمرانية الغربية", nameEn: "West Omrania" },
          { id: "omr-khatem-morsaleen", nameAr: "شارع خاتم المرسلين ومحطة نصر الدين", nameEn: "Khatem El Morsaleen" },
          { id: "omr-sidi-ammar", nameAr: "سيدي عمار وشارع الدكتور", nameEn: "Sidi Ammar" },
        ],
      },
      {
        id: "giza-talbia",
        nameAr: "الطالبية",
        nameEn: "Talbia",
        subareas: [
          { id: "tlb-haram", nameAr: "طالبية هرم ومحطة الكوبري", nameEn: "Talbia Haram" },
          { id: "tlb-faisal", nameAr: "طالبية فيصل وعثمان محرم", nameEn: "Talbia Faisal" },
          { id: "tlb-orouba", nameAr: "شارع العروبة والكونيسة", nameEn: "El Orouba & Kounaisa" },
        ],
      },
      {
        id: "giza-kafr-tohormos",
        nameAr: "كفر طهرمس",
        nameEn: "Kafr Tohormos",
        subareas: [
          { id: "kt-center", nameAr: "وسط كفر طهرمس وموقف السيارات", nameEn: "Kafr Tohormos Center" },
          { id: "kt-mansheya", nameAr: "شارع المنشية ومساكن طهرمس", nameEn: "El Mansheya St" },
          { id: "kt-shohadaa", nameAr: "شارع الشهداء وطريق الدائري", nameEn: "Shohadaa St" },
        ],
      },
      {
        id: "giza-imbaba",
        nameAr: "إمبابة",
        nameEn: "Imbaba",
        subareas: [
          { id: "imb-kitkat", nameAr: "ميدان الكيت كات ومحيط المحكمة", nameEn: "Kit Kat Square" },
          { id: "imb-talaat-harb", nameAr: "شارع طلعت حرب إمبابة وميدان الترعة", nameEn: "Talaat Harb Imbaba" },
          { id: "imb-qawmeya", nameAr: "القومية العربية وميدان الحجاز", nameEn: "El Qawmeya El Arabia" },
          { id: "imb-moneera-sharq", nameAr: "المنيرة الشرقية ومحيط كوبري النمر", nameEn: "East Moneera" },
          { id: "imb-moneera-gharb", nameAr: "المنيرة الغربية ومطار إمبابة القديم", nameEn: "West Moneera" },
        ],
      },
      {
        id: "giza-warraq",
        nameAr: "الوراق",
        nameEn: "Warraq",
        subareas: [
          { id: "wrq-center", nameAr: "الوراق القديمة وميدان التل", nameEn: "Warraq Center" },
          { id: "wrq-corniche", nameAr: "كورنيش الوراق وجزيرة محمد", nameEn: "Warraq Corniche" },
          { id: "wrq-tanash", nameAr: "طناش ونزلة الدائري", nameEn: "Tanash" },
        ],
      },
      {
        id: "giza-bulaq-dakrour",
        nameAr: "بولاق الدكرور",
        nameEn: "Bulaq El Dakrour",
        subareas: [
          { id: "bd-hamfars", nameAr: "شارع همفرس ومحطة المترو", nameEn: "Hamfars St" },
          { id: "bd-saft-laban", nameAr: "صفط اللبن ومحيط الكوبري", nameEn: "Saft El Laban" },
          { id: "bd-abu-qatada", nameAr: "أبو قتادة وكفر بركاش", nameEn: "Abu Qatada" },
          { id: "bd-nahia", nameAr: "ناهيا ومساكن بولاق", nameEn: "Nahia Area" },
        ],
      },
      {
        id: "giza-hadayek-october",
        nameAr: "حدائق أكتوبر",
        nameEn: "Hadayek October",
        subareas: [
          { id: "ho-ashgar", nameAr: "حي الأشجار ومحيط دريم لاند", nameEn: "Hay El Ashgar" },
          { id: "ho-fardous", nameAr: "مدينة الفردوس والشرطة", nameEn: "El Fardous City" },
          { id: "ho-ebny-beitak", nameAr: "مناطق ابني بيتك (1 - 7)", nameEn: "Ebny Beitak" },
          { id: "ho-dahshur", nameAr: "مساكن دهشور والإسكان الاجتماعي", nameEn: "Dahshur Housing" },
          { id: "ho-clubs", nameAr: "منطقة النوادي (الزمالك، الترسانة)", nameEn: "Clubs Area" },
        ],
      },
      {
        id: "giza-new-october",
        nameAr: "أكتوبر الجديدة",
        nameEn: "New October",
        subareas: [
          { id: "no-sector-a", nameAr: "القطاع (أ) والحي المتميز", nameEn: "Sector A" },
          { id: "no-sector-b", nameAr: "القطاع (ب) ومساكن الـ 800 فدان", nameEn: "Sector B (800 Feddan)" },
          { id: "no-degla-palms", nameAr: "كمباوند دجلة بالمز ومحيطه", nameEn: "Degla Palms" },
          { id: "no-industrial", nameAr: "المنطقة الصناعية الجديدة", nameEn: "New Industrial Area" },
        ],
      },
      {
        id: "giza-west-somid",
        nameAr: "غرب سوميد والجيزة الجديدة",
        nameEn: "West Somid & New Giza",
        subareas: [
          { id: "ws-somid-villas", nameAr: "منطقة فيلات غرب سوميد بالكامل", nameEn: "West Somid Villas" },
          { id: "ws-new-giza", nameAr: "نيو جيزة ومحيط بالم هيلز", nameEn: "New Giza & Palm Hills" },
        ],
      },
    ],
  },
];
