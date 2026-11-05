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
    "id": "cairo",
    "nameAr": "محافظة القاهرة",
    "nameEn": "Cairo",
    "mainAreas": [
      {
        "id": "cairo-nasr-city",
        "nameAr": "مدينة نصر",
        "nameEn": "Nasr City",
        "subareas": [
          {
            "id": "nc-abbas-el-akkad",
            "nameAr": "شارع عباس العقاد",
            "nameEn": "Abbas El Akkad"
          },
          {
            "id": "nc-makram-ebeid",
            "nameAr": "شارع مكرم عبيد",
            "nameEn": "Makram Ebeid"
          },
          {
            "id": "nc-mostafa-el-nahas",
            "nameAr": "شارع مصطفى النحاس",
            "nameEn": "Mostafa El Nahas"
          },
          {
            "id": "nc-el-tayaran",
            "nameAr": "شارع الطيران ومحيط رابعة",
            "nameEn": "El Tayaran"
          },
          {
            "id": "nc-ahmed-el-zomor",
            "nameAr": "شارع أحمد الزمر (ذاكر حسين)",
            "nameEn": "Ahmed El Zomor"
          },
          {
            "id": "nc-emtedad-ramses",
            "nameAr": "امتداد رمسيس ومحيط الاستاد",
            "nameEn": "Emtedad Ramses"
          },
          {
            "id": "nc-zahraa",
            "nameAr": "زهراء مدينة نصر",
            "nameEn": "Zahraa Nasr City"
          },
          {
            "id": "nc-free-zone",
            "nameAr": "المنطقة الحرة السابعة",
            "nameEn": "Free Zone"
          },
          {
            "id": "nc-districts-1-5",
            "nameAr": "الأحياء من الأول حتى الخامس",
            "nameEn": "Districts 1-5"
          },
          {
            "id": "nc-districts-6-10",
            "nameAr": "الأحياء من السادس حتى العاشر",
            "nameEn": "Districts 6-10"
          },
          {
            "id": "nc-swiss-area",
            "nameAr": "المنطقة السويسرية والوفاء والأمل",
            "nameEn": "Swiss Area"
          }
        ]
      },
      {
        "id": "cairo-new-cairo",
        "nameAr": "القاهرة الجديدة / التجمع",
        "nameEn": "New Cairo",
        "subareas": [
          {
            "id": "tag-5th-settlement",
            "nameAr": "التجمع الخامس (الحي الأول - الخامس)",
            "nameEn": "5th Settlement"
          },
          {
            "id": "tag-1st-settlement",
            "nameAr": "التجمع الأول",
            "nameEn": "1st Settlement"
          },
          {
            "id": "tag-3rd-settlement",
            "nameAr": "التجمع الثالث",
            "nameEn": "3rd Settlement"
          },
          {
            "id": "tag-narges",
            "nameAr": "النرجس والنرجس الجديدة",
            "nameEn": "Narges & New Narges"
          },
          {
            "id": "tag-banafseg",
            "nameAr": "البنفسج",
            "nameEn": "Banafseg"
          },
          {
            "id": "tag-yasmeen",
            "nameAr": "الياسمين",
            "nameEn": "Yasmeen"
          },
          {
            "id": "tag-koronfel",
            "nameAr": "القرنفل",
            "nameEn": "Koronfel"
          },
          {
            "id": "tag-andalus",
            "nameAr": "الأندلس",
            "nameEn": "Andalus"
          },
          {
            "id": "tag-academy",
            "nameAr": "شمال وجنوب الأكاديمية",
            "nameEn": "North & South Academy"
          },
          {
            "id": "tag-investors",
            "nameAr": "المستثمرين الشمالية والجنوبية",
            "nameEn": "Investors Area"
          },
          {
            "id": "tag-beit-el-watan",
            "nameAr": "بيت الوطن",
            "nameEn": "Beit El Watan"
          },
          {
            "id": "tag-lotus",
            "nameAr": "اللوتس الشمالية والجنوبية",
            "nameEn": "Lotus Area"
          },
          {
            "id": "tag-rehab",
            "nameAr": "مدينة الرحاب",
            "nameEn": "Al Rehab City"
          },
          {
            "id": "tag-madinaty",
            "nameAr": "مدينتي",
            "nameEn": "Madinaty"
          },
          {
            "id": "tag-golden-square",
            "nameAr": "الميدان الذهبي (Golden Square)",
            "nameEn": "Golden Square"
          },
          {
            "id": "tag-90-st",
            "nameAr": "شارع التسعين (الشمالي والجنوبي)",
            "nameEn": "90th Street"
          },
          {
            "id": "tag-choueifat",
            "nameAr": "حي الشويفات",
            "nameEn": "Choueifat"
          }
        ]
      },
      {
        "id": "cairo-heliopolis",
        "nameAr": "مصر الجديدة / هليوبوليس",
        "nameEn": "Heliopolis",
        "subareas": [
          {
            "id": "helio-korba",
            "nameAr": "الكوربة",
            "nameEn": "Korba"
          },
          {
            "id": "helio-roxy",
            "nameAr": "ميدان روكسي",
            "nameEn": "Roxy"
          },
          {
            "id": "helio-merghani",
            "nameAr": "شارع الميرغني",
            "nameEn": "Merghani"
          },
          {
            "id": "helio-hegaz",
            "nameAr": "ميدان وشارع الحجاز",
            "nameEn": "Hegaz"
          },
          {
            "id": "helio-triumph",
            "nameAr": "ميدان تريومف",
            "nameEn": "Triumph"
          },
          {
            "id": "helio-ard-el-golf",
            "nameAr": "أرض الجولف",
            "nameEn": "Ard El Golf"
          },
          {
            "id": "helio-almaza",
            "nameAr": "ألماظة",
            "nameEn": "Almaza"
          },
          {
            "id": "helio-sheraton",
            "nameAr": "مساكن شيراتون المطار",
            "nameEn": "Sheraton Heliopolis"
          },
          {
            "id": "helio-nozha",
            "nameAr": "النزهة الجديدة",
            "nameEn": "New Nozha"
          }
        ]
      },
      {
        "id": "cairo-maadi",
        "nameAr": "المعادي",
        "nameEn": "Maadi",
        "subareas": [
          {
            "id": "maadi-sarayat",
            "nameAr": "المعادي السرايات",
            "nameEn": "Sarayat El Maadi"
          },
          {
            "id": "maadi-degla",
            "nameAr": "دجلة المعادي",
            "nameEn": "Degla Maadi"
          },
          {
            "id": "maadi-old-new",
            "nameAr": "المعادي القديمة والجديدة",
            "nameEn": "Old & New Maadi"
          },
          {
            "id": "maadi-laselky",
            "nameAr": "شارع اللاسلكي وشارع النصر",
            "nameEn": "El Laselky & El Nasr"
          },
          {
            "id": "maadi-corniche",
            "nameAr": "كورنيش المعادي وأبراج عثمان",
            "nameEn": "Maadi Corniche"
          },
          {
            "id": "maadi-zahraa",
            "nameAr": "زهراء المعادي وكارفور",
            "nameEn": "Zahraa El Maadi"
          },
          {
            "id": "maadi-autostrad",
            "nameAr": "محيط الأوتوستراد وصقر قريش",
            "nameEn": "Saqr Quraish"
          }
        ]
      },
      {
        "id": "cairo-mokattam",
        "nameAr": "المقطم",
        "nameEn": "Mokattam",
        "subareas": []
      },
      {
        "id": "cairo-downtown",
        "nameAr": "وسط البلد",
        "nameEn": "Downtown Cairo",
        "subareas": []
      },
      {
        "id": "cairo-zamalek",
        "nameAr": "الزمالك",
        "nameEn": "Zamalek",
        "subareas": []
      },
      {
        "id": "cairo-garden-city",
        "nameAr": "جاردن سيتي",
        "nameEn": "Garden City",
        "subareas": []
      },
      {
        "id": "cairo-manial",
        "nameAr": "المنيل",
        "nameEn": "Manial",
        "subareas": []
      },
      {
        "id": "cairo-sayeda-zeinab",
        "nameAr": "السيدة زينب",
        "nameEn": "Sayeda Zeinab",
        "subareas": []
      },
      {
        "id": "cairo-old-cairo",
        "nameAr": "مصر القديمة",
        "nameEn": "Old Cairo",
        "subareas": []
      },
      {
        "id": "cairo-shubra",
        "nameAr": "شبرا مصر",
        "nameEn": "Shubra",
        "subareas": []
      },
      {
        "id": "cairo-rod-el-farag",
        "nameAr": "روض الفرج",
        "nameEn": "Rod El Farag",
        "subareas": []
      },
      {
        "id": "cairo-sahel",
        "nameAr": "الساحل",
        "nameEn": "Sahel",
        "subareas": []
      },
      {
        "id": "cairo-zeitoun",
        "nameAr": "الزيتون وحلمية الزيتون",
        "nameEn": "Zeitoun",
        "subareas": [
          {
            "id": "zeitoun-east",
            "nameAr": "الزيتون الشرقية وميدان المحطة",
            "nameEn": "East Zeitoun"
          },
          {
            "id": "zeitoun-west",
            "nameAr": "الزيتون الغربية وسنان باشا",
            "nameEn": "West Zeitoun"
          },
          {
            "id": "zeitoun-helmiya",
            "nameAr": "حلمية الزيتون وميدان ابن سندر",
            "nameEn": "Helmiyet El Zeitoun"
          },
          {
            "id": "zeitoun-saray-qobba",
            "nameAr": "سراي القبة",
            "nameEn": "Saray El Qobba"
          }
        ]
      },
      {
        "id": "cairo-hadayek-el-qobba",
        "nameAr": "حدائق القبة",
        "nameEn": "Hadayek El Qobba",
        "subareas": [
          {
            "id": "hq-misr-sudan",
            "nameAr": "شارع مصر والسودان",
            "nameEn": "Misr Wa Sudan St"
          },
          {
            "id": "hq-kobri-qobba",
            "nameAr": "كوبري القبة ومحيط القصر",
            "nameEn": "Kobri El Qobba"
          },
          {
            "id": "hq-wayli-kabir",
            "nameAr": "الوايلي الكبير والديوان",
            "nameEn": "El Wayli & Diwan"
          }
        ]
      },
      {
        "id": "cairo-el-zawya-el-hamra",
        "nameAr": "الزاوية الحمراء",
        "nameEn": "El Zawya El Hamra",
        "subareas": []
      },
      {
        "id": "cairo-el-daher",
        "nameAr": "الظاهر والفجالة",
        "nameEn": "El Daher & Faggala",
        "subareas": []
      },
      {
        "id": "cairo-abbassia",
        "nameAr": "العباسية",
        "nameEn": "Abbassia",
        "subareas": []
      },
      {
        "id": "cairo-ain-shams",
        "nameAr": "عين شمس",
        "nameEn": "Ain Shams",
        "subareas": [
          {
            "id": "as-east",
            "nameAr": "عين شمس الشرقية وأحمد عصمت",
            "nameEn": "East Ain Shams"
          },
          {
            "id": "as-west",
            "nameAr": "عين شمس الغربية وميدان النعام",
            "nameEn": "West Ain Shams"
          },
          {
            "id": "as-masaken",
            "nameAr": "مساكن عين شمس ومنشية التحرير",
            "nameEn": "Ain Shams Housing"
          },
          {
            "id": "as-zahraa",
            "nameAr": "زهراء عين شمس",
            "nameEn": "Zahraa Ain Shams"
          }
        ]
      },
      {
        "id": "cairo-matariya",
        "nameAr": "المطرية",
        "nameEn": "Matariya",
        "subareas": []
      },
      {
        "id": "cairo-marg",
        "nameAr": "المرج وعزبة النخل",
        "nameEn": "Marg",
        "subareas": [
          {
            "id": "marg-old",
            "nameAr": "المرج القديمة ومحطة المترو",
            "nameEn": "Old Marg"
          },
          {
            "id": "marg-new",
            "nameAr": "المرج الجديدة ومؤسسة الزكاة",
            "nameEn": "New Marg"
          },
          {
            "id": "marg-ezbet-nakhl",
            "nameAr": "عزبة النخل الشرقية والغربية",
            "nameEn": "Ezbet El Nakhl"
          }
        ]
      },
      {
        "id": "cairo-salam",
        "nameAr": "مدينة السلام",
        "nameEn": "Salam City",
        "subareas": [
          {
            "id": "salam-atlas",
            "nameAr": "مساكن أطلس والعبد",
            "nameEn": "Atlas & El Abd"
          },
          {
            "id": "salam-ispico",
            "nameAr": "منطقة إسبيكو ومحطة أمان",
            "nameEn": "Ispico"
          },
          {
            "id": "salam-herfyeen",
            "nameAr": "مدينة الحرفيين",
            "nameEn": "Herfyeen City"
          }
        ]
      },
      {
        "id": "cairo-gesr-el-suez",
        "nameAr": "جسر السويس",
        "nameEn": "Gesr El Suez",
        "subareas": [
          {
            "id": "gesr-alef-maskan",
            "nameAr": "الألف مسكن وميدان الحجاز الجديد",
            "nameEn": "Alef Maskan"
          },
          {
            "id": "gesr-nozha-2",
            "nameAr": "النزهة 2 وحي السلام",
            "nameEn": "Nozha 2"
          },
          {
            "id": "gesr-badr-park",
            "nameAr": "محيط حديقة بدر وشارع الأربعين",
            "nameEn": "Badr Park Area"
          },
          {
            "id": "gesr-qobaa",
            "nameAr": "منطقة قباء وشارع الخمسين",
            "nameEn": "Qobaa"
          }
        ]
      },
      {
        "id": "cairo-dar-el-salam",
        "nameAr": "دار السلام",
        "nameEn": "Dar El Salam",
        "subareas": []
      },
      {
        "id": "cairo-basateen",
        "nameAr": "البساتين",
        "nameEn": "Basateen",
        "subareas": []
      },
      {
        "id": "cairo-helwan",
        "nameAr": "حلوان",
        "nameEn": "Helwan",
        "subareas": [
          {
            "id": "helwan-center",
            "nameAr": "وسط حلوان ومحيط المحطة والشارع الغربي",
            "nameEn": "Helwan Center"
          },
          {
            "id": "helwan-ain",
            "nameAr": "عين حلوان ومحيط كابريتاج",
            "nameEn": "Ain Helwan"
          },
          {
            "id": "helwan-hadayek",
            "nameAr": "حدائق حلوان ووادي حوف",
            "nameEn": "Hadayek Helwan & Wadi Houf"
          },
          {
            "id": "helwan-american-project",
            "nameAr": "المشروع الأمريكي والجامعة",
            "nameEn": "American Project"
          }
        ]
      },
      {
        "id": "cairo-15-may",
        "nameAr": "مدينة 15 مايو",
        "nameEn": "15 May City",
        "subareas": [
          {
            "id": "15m-phase-1",
            "nameAr": "المجاورات الأولى (1 - 12)",
            "nameEn": "Phase 1 (1-12)"
          },
          {
            "id": "15m-phase-2",
            "nameAr": "المجاورات الثانية (13 - 24)",
            "nameEn": "Phase 2 (13-24)"
          },
          {
            "id": "15m-business",
            "nameAr": "حي رجال الأعمال والامتداد",
            "nameEn": "Business District"
          }
        ]
      },
      {
        "id": "cairo-obour",
        "nameAr": "مدينة العبور",
        "nameEn": "Obour City",
        "subareas": [
          {
            "id": "obour-districts-1-5",
            "nameAr": "الأحياء من الأول إلى الخامس",
            "nameEn": "Districts 1-5"
          },
          {
            "id": "obour-districts-6-9",
            "nameAr": "الأحياء من السادس إلى التاسع",
            "nameEn": "Districts 6-9"
          },
          {
            "id": "obour-golf-city",
            "nameAr": "جولف سيتي وكارفور العبور",
            "nameEn": "Golf City & Carrefour"
          },
          {
            "id": "obour-industrial",
            "nameAr": "المنطقة الصناعية (أ، ب، ج)",
            "nameEn": "Industrial Zone"
          }
        ]
      },
      {
        "id": "cairo-shorouk",
        "nameAr": "مدينة الشروق",
        "nameEn": "Shorouk City",
        "subareas": [
          {
            "id": "shk-districts-1-4",
            "nameAr": "الأحياء السكنية (الأول - الرابع)",
            "nameEn": "Districts 1-4"
          },
          {
            "id": "shk-districts-5-8",
            "nameAr": "الأحياء السكنية (الخامس - الثامن)",
            "nameEn": "Districts 5-8"
          },
          {
            "id": "shk-clubs",
            "nameAr": "منطقة النوادي والجامعة البريطانية",
            "nameEn": "Clubs & BUE"
          }
        ]
      },
      {
        "id": "cairo-badr",
        "nameAr": "مدينة بدر",
        "nameEn": "Badr City",
        "subareas": [
          {
            "id": "badr-motamayez",
            "nameAr": "الحي المتميز وحي الفردوس",
            "nameEn": "Motamayez & Fardous"
          },
          {
            "id": "badr-safwa",
            "nameAr": "حي الصفوة وزهرة العاصمة",
            "nameEn": "Safwa & Zahret El Assema"
          },
          {
            "id": "badr-industrial",
            "nameAr": "المنطقة الصناعية بالروبيكي",
            "nameEn": "Industrial Roubiki"
          }
        ]
      },
      {
        "id": "cairo-new-capital",
        "nameAr": "العاصمة الإدارية الجديدة",
        "nameEn": "New Administrative Capital",
        "subareas": [
          {
            "id": "nac-r1-r2",
            "nameAr": "الأحياء السكنية R1 و R2",
            "nameEn": "Residential R1 & R2"
          },
          {
            "id": "nac-r3",
            "nameAr": "الحي السكني R3 (كابيتال ريزيدنس)",
            "nameEn": "Residential R3"
          },
          {
            "id": "nac-r5",
            "nameAr": "الحي السكني R5 (جاردن سيتي الجديدة)",
            "nameEn": "Residential R5"
          },
          {
            "id": "nac-r7",
            "nameAr": "الحي السكني R7 والمستثمرين",
            "nameEn": "Residential R7"
          },
          {
            "id": "nac-gov-district",
            "nameAr": "الحي الحكومي ومجلس النواب",
            "nameEn": "Government District"
          },
          {
            "id": "nac-cbd",
            "nameAr": "منطقة الأعمال المركزية (البرج الأيقوني)",
            "nameEn": "Central Business District"
          },
          {
            "id": "nac-downtown",
            "nameAr": "منطقة الداون تاون (Down Town)",
            "nameEn": "Down Town"
          }
        ]
      }
    ]
  },
  {
    "id": "giza",
    "nameAr": "محافظة الجيزة",
    "nameEn": "Giza",
    "mainAreas": [
      {
        "id": "giza-mohandessin",
        "nameAr": "المهندسين",
        "nameEn": "Mohandessin",
        "subareas": []
      },
      {
        "id": "giza-dokki",
        "nameAr": "الدقي",
        "nameEn": "Dokki",
        "subareas": []
      },
      {
        "id": "giza-agouza",
        "nameAr": "العجوزة",
        "nameEn": "Agouza",
        "subareas": []
      },
      {
        "id": "giza-6th-october",
        "nameAr": "مدينة 6 أكتوبر",
        "nameEn": "6th of October City",
        "subareas": [
          {
            "id": "oct-districts-1-6",
            "nameAr": "الأحياء من الأول حتى السادس",
            "nameEn": "Districts 1-6"
          },
          {
            "id": "oct-districts-7-12",
            "nameAr": "الأحياء من السابع حتى الثاني عشر وميدان الحصري",
            "nameEn": "Districts 7-12"
          },
          {
            "id": "oct-somid",
            "nameAr": "منطقة فيلات سوميد ومحور 26 يوليو",
            "nameEn": "Somid Villas & Axis"
          },
          {
            "id": "oct-north-expansions",
            "nameAr": "التوسعات الشمالية ومحيط مول العرب",
            "nameEn": "Northern Expansions"
          },
          {
            "id": "oct-south-expansions",
            "nameAr": "التوسعات الجنوبية وميدان النجدة",
            "nameEn": "Southern Expansions"
          },
          {
            "id": "oct-industrial",
            "nameAr": "المنطقة الصناعية (المراحل 1 - 6)",
            "nameEn": "Industrial Zone"
          },
          {
            "id": "oct-motamayez",
            "nameAr": "الحي المتميز وجامعة مصر",
            "nameEn": "Motamayez District"
          }
        ]
      },
      {
        "id": "giza-sheikh-zayed",
        "nameAr": "مدينة الشيخ زايد",
        "nameEn": "Sheikh Zayed City",
        "subareas": [
          {
            "id": "zayed-districts-1-4",
            "nameAr": "الأحياء السكنية (الأول، الثاني، الثالث، الرابع)",
            "nameEn": "Districts 1-4"
          },
          {
            "id": "zayed-districts-5-9",
            "nameAr": "الأحياء السكنية (الخامس، السابع، الثامن، التاسع)",
            "nameEn": "Districts 5-9"
          },
          {
            "id": "zayed-districts-10-16",
            "nameAr": "الأحياء السكنية (العاشر، الحادي عشر، الرابع عشر، السادس عشر)",
            "nameEn": "Districts 10-16"
          },
          {
            "id": "zayed-zayed-2000",
            "nameAr": "حي الشيخ زايد 2000 والحديقة الدولية",
            "nameEn": "Zayed 2000"
          },
          {
            "id": "zayed-beverly-hills",
            "nameAr": "بيفرلي هيلز ومحيط سوديك",
            "nameEn": "Beverly Hills"
          },
          {
            "id": "zayed-khamael",
            "nameAr": "الخمائل ومحيط المحور المركزي",
            "nameEn": "Khamael Area"
          },
          {
            "id": "zayed-green-belt",
            "nameAr": "الحزام الأخضر والامتدادات الحديثة",
            "nameEn": "Green Belt"
          }
        ]
      },
      {
        "id": "giza-hadayek-el-ahram",
        "nameAr": "حدائق الأهرام",
        "nameEn": "Hadayek El Ahram",
        "subareas": [
          {
            "id": "ha-gate-1",
            "nameAr": "البوابة الأولى (بوابة خوفو)",
            "nameEn": "Gate 1 (Khufu)"
          },
          {
            "id": "ha-gate-2",
            "nameAr": "البوابة الثانية (بوابة خفرع)",
            "nameEn": "Gate 2 (Khafre)"
          },
          {
            "id": "ha-gate-3",
            "nameAr": "البوابة الثالثة (بوابة منقرع)",
            "nameEn": "Gate 3 (Menkaure)"
          },
          {
            "id": "ha-gate-4",
            "nameAr": "البوابة الرابعة (بوابة مينا)",
            "nameEn": "Gate 4 (Mena)"
          },
          {
            "id": "ha-pressure-area",
            "nameAr": "منطقة الضغط العالي والشارع الجديد",
            "nameEn": "High Pressure St"
          }
        ]
      },
      {
        "id": "giza-faisal",
        "nameAr": "فيصل",
        "nameEn": "Faisal",
        "subareas": [
          {
            "id": "fsl-main-street",
            "nameAr": "شارع فيصل الرئيسي (من الجيزة للمشعل)",
            "nameEn": "Faisal Main St"
          },
          {
            "id": "fsl-eshreen",
            "nameAr": "شارع العشرين والأربعين",
            "nameEn": "Eshreen St"
          },
          {
            "id": "fsl-hassan-mohamed",
            "nameAr": "حسن محمد وشارع ضياء",
            "nameEn": "Hassan Mohamed"
          },
          {
            "id": "fsl-matbaa",
            "nameAr": "المطبعة ومحطة المساحة",
            "nameEn": "El Matbaa"
          },
          {
            "id": "fsl-taawon",
            "nameAr": "التعاون ومحطة مدكور",
            "nameEn": "El Taawon & Madkour"
          },
          {
            "id": "fsl-tawabe2",
            "nameAr": "الطوابق وكفر غطاطي",
            "nameEn": "El Tawabe2"
          },
          {
            "id": "fsl-masaken-dobat",
            "nameAr": "مساكن الضباط والرماية",
            "nameEn": "Officers Housing"
          }
        ]
      },
      {
        "id": "giza-haram",
        "nameAr": "الهرم",
        "nameEn": "Haram",
        "subareas": [
          {
            "id": "hrm-main-street",
            "nameAr": "شارع الهرم الرئيسي (كامل القطاع)",
            "nameEn": "Haram Main St"
          },
          {
            "id": "hrm-areesh",
            "nameAr": "شارع العريش",
            "nameEn": "El Areesh St"
          },
          {
            "id": "hrm-nasr-eldin",
            "nameAr": "نصر الدين ومحافظة الجيزة",
            "nameEn": "Nasr El Din"
          },
          {
            "id": "hrm-terssa",
            "nameAr": "شارع ترسا (محمد أنور السادات)",
            "nameEn": "Terssa St"
          },
          {
            "id": "hrm-kom-akhdar",
            "nameAr": "الكوم الأخضر والوفاء والأمل",
            "nameEn": "Kom El Akhdar"
          },
          {
            "id": "hrm-meshal",
            "nameAr": "محطة مشعل ومحيط الأهرامات",
            "nameEn": "Meshal & Pyramids"
          },
          {
            "id": "hrm-mansoureya",
            "nameAr": "طريق المنصورية وشبرامنت",
            "nameEn": "Mansoureya Road"
          }
        ]
      },
      {
        "id": "giza-giza-district",
        "nameAr": "حي الجيزة والمنيب",
        "nameEn": "Giza District",
        "subareas": [
          {
            "id": "gz-midan",
            "nameAr": "ميدان الجيزة وشارع المحطة",
            "nameEn": "Giza Square"
          },
          {
            "id": "gz-mourad-st",
            "nameAr": "شارع مراد وشارع الأهرام بداية",
            "nameEn": "Mourad St"
          },
          {
            "id": "gz-bahr-aazam",
            "nameAr": "شارع البحر الأعظم وكورنيش النيل",
            "nameEn": "Bahr El Aazam St"
          },
          {
            "id": "gz-moneib",
            "nameAr": "المنيب ومحيط الدائري ومحطة المترو",
            "nameEn": "El Moneib"
          },
          {
            "id": "gz-saqyet-maki",
            "nameAr": "ساقية مكي وجزيرة الذهب",
            "nameEn": "Saqyet Maki"
          }
        ]
      },
      {
        "id": "giza-omrania",
        "nameAr": "العمرانية",
        "nameEn": "Omrania",
        "subareas": [
          {
            "id": "omr-sharqia",
            "nameAr": "العمرانية الشرقية",
            "nameEn": "East Omrania"
          },
          {
            "id": "omr-gharbia",
            "nameAr": "العمرانية الغربية",
            "nameEn": "West Omrania"
          },
          {
            "id": "omr-khatem-morsaleen",
            "nameAr": "شارع خاتم المرسلين ومحطة نصر الدين",
            "nameEn": "Khatem El Morsaleen"
          },
          {
            "id": "omr-sidi-ammar",
            "nameAr": "سيدي عمار وشارع الدكتور",
            "nameEn": "Sidi Ammar"
          }
        ]
      },
      {
        "id": "giza-talbia",
        "nameAr": "الطالبية",
        "nameEn": "Talbia",
        "subareas": []
      },
      {
        "id": "giza-imbaba",
        "nameAr": "إمبابة",
        "nameEn": "Imbaba",
        "subareas": []
      },
      {
        "id": "giza-warraq",
        "nameAr": "الوراق",
        "nameEn": "Warraq",
        "subareas": []
      },
      {
        "id": "giza-bulaq-dakrour",
        "nameAr": "بولاق الدكرور",
        "nameEn": "Bulaq El Dakrour",
        "subareas": []
      },
      {
        "id": "giza-hadayek-october",
        "nameAr": "حدائق أكتوبر",
        "nameEn": "Hadayek October",
        "subareas": [
          {
            "id": "ho-ashgar",
            "nameAr": "حي الأشجار ومحيط دريم لاند",
            "nameEn": "Hay El Ashgar"
          },
          {
            "id": "ho-fardous",
            "nameAr": "مدينة الفردوس والشرطة",
            "nameEn": "El Fardous City"
          },
          {
            "id": "ho-ebny-beitak",
            "nameAr": "مناطق ابني بيتك (1 - 7)",
            "nameEn": "Ebny Beitak"
          },
          {
            "id": "ho-dahshur",
            "nameAr": "مساكن دهشور والإسكان الاجتماعي",
            "nameEn": "Dahshur Housing"
          },
          {
            "id": "ho-clubs",
            "nameAr": "منطقة النوادي (الزمالك، الترسانة)",
            "nameEn": "Clubs Area"
          }
        ]
      },
      {
        "id": "giza-new-october",
        "nameAr": "أكتوبر الجديدة",
        "nameEn": "New October",
        "subareas": [
          {
            "id": "no-sector-a",
            "nameAr": "القطاع (أ) والحي المتميز",
            "nameEn": "Sector A"
          },
          {
            "id": "no-sector-b",
            "nameAr": "القطاع (ب) ومساكن الـ 800 فدان",
            "nameEn": "Sector B (800 Feddan)"
          },
          {
            "id": "no-degla-palms",
            "nameAr": "كمباوند دجلة بالمز ومحيطه",
            "nameEn": "Degla Palms"
          },
          {
            "id": "no-industrial",
            "nameAr": "المنطقة الصناعية الجديدة",
            "nameEn": "New Industrial Area"
          }
        ]
      }
    ]
  }
];
