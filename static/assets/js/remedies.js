/*
 * Self-care guidance shown alongside a model prediction.
 * Keys are matched loosely, so Teachable Machine labels like
 * "Atopic Dermatitis" or "acne_vulgaris" still resolve.
 */
window.SKIN_CONDITIONS = {
  acne: {
    label: "Acne",
    severity: "low",
    aliases: ["pimple", "pimples", "acnevulgaris", "zits", "blackhead", "whitehead"],
    summary:
      "Blocked pores and oil glands, often with bacteria and inflammation. Very common and highly treatable.",
    immediate: [
      "Wash the area with lukewarm water and a gentle, fragrance-free cleanser",
      "Pat dry — never scrub or rub the skin",
      "Apply a cool compress for 5–10 minutes to calm redness and swelling"
    ],
    remedies: [
      "Over-the-counter benzoyl peroxide (2.5%) or salicylic acid, once daily to start",
      "Dab diluted tea tree oil (1 part oil to 9 parts carrier oil) on individual spots",
      "Switch to non-comedogenic (won't-clog-pores) moisturiser and sunscreen",
      "Change pillowcases twice a week and clean your phone screen"
    ],
    avoid: [
      "Picking, squeezing or popping — this is what causes scarring",
      "Harsh scrubs and alcohol-based toners, which worsen inflammation",
      "Heavy oil-based makeup while the area is active"
    ],
    seeDoctor: [
      "Deep, painful lumps under the skin (cystic acne)",
      "Scarring or dark marks starting to form",
      "No improvement after 6–8 weeks of over-the-counter treatment"
    ]
  },

  eczema: {
    label: "Eczema (Atopic Dermatitis)",
    severity: "moderate",
    aliases: ["atopicdermatitis", "dermatitis", "atopiceczema"],
    summary:
      "A dry, itchy, inflamed skin barrier that flares in response to triggers. Chronic but manageable.",
    immediate: [
      "Apply a thick fragrance-free moisturiser or ointment while skin is still damp",
      "Cool compress on the itchiest areas for 10 minutes",
      "Keep nails short to limit damage from scratching"
    ],
    remedies: [
      "Lukewarm (never hot) showers under 10 minutes",
      "Colloidal oatmeal bath to relieve widespread itching",
      "Moisturise at least twice daily — ointments beat lotions",
      "Over-the-counter 1% hydrocortisone on flares, short-term only",
      "Run a humidifier if indoor air is dry"
    ],
    avoid: [
      "Fragranced soaps, detergents and fabric softeners",
      "Wool and other scratchy fabrics directly on skin",
      "Long hot showers, which strip the skin barrier"
    ],
    seeDoctor: [
      "Skin becomes weepy, crusted, or yellow — this suggests infection",
      "Itching is severe enough to disrupt sleep",
      "Flares keep returning despite consistent moisturising"
    ]
  },

  psoriasis: {
    label: "Psoriasis",
    severity: "moderate",
    aliases: ["plaquepsoriasis", "scalppsoriasis"],
    summary:
      "An immune-driven condition where skin cells build up into thick, scaly plaques. Not contagious.",
    immediate: [
      "Apply a thick moisturiser or ointment to soften scale",
      "Cool compress to reduce burning and itch",
      "Leave plaques intact — do not peel or scrape them off"
    ],
    remedies: [
      "Warm bath with colloidal oatmeal or Epsom salts, then moisturise immediately",
      "Coal tar or salicylic acid preparations from the pharmacy",
      "Brief, regular sunlight exposure often helps — but never burn",
      "Over-the-counter 1% hydrocortisone on small areas"
    ],
    avoid: [
      "Scratching or picking scale, which triggers new plaques at injury sites",
      "Skin injury, sunburn, smoking and heavy alcohol — all common flare triggers",
      "Letting stress run unmanaged, a well-documented trigger"
    ],
    seeDoctor: [
      "Joint pain, stiffness or swelling — psoriatic arthritis needs early treatment",
      "Plaques covering large areas of the body",
      "Significant impact on sleep, work or mental health"
    ]
  },

  ringworm: {
    label: "Ringworm (Tinea)",
    severity: "moderate",
    aliases: ["tinea", "tineacorporis", "fungalinfection", "dermatophytosis", "athletesfoot", "tineapedis", "jockitch"],
    summary:
      "A contagious fungal infection producing a ring-shaped, scaly, itchy patch with a clearer centre.",
    immediate: [
      "Wash the area with soap and water, then dry thoroughly — fungus thrives in moisture",
      "Start an over-the-counter antifungal cream (clotrimazole, terbinafine or miconazole)",
      "Wash hands after touching it, and don't share towels or clothing"
    ],
    remedies: [
      "Apply antifungal cream twice daily, extending 2cm beyond the visible edge",
      "Keep going for 1–2 weeks after it looks clear, or it will come back",
      "Wear loose, breathable cotton clothing",
      "Hot-wash bedding, towels and clothing that touched the area"
    ],
    avoid: [
      "Covering it with an airtight bandage",
      "Sharing towels, razors, bedding or sports equipment",
      "Steroid creams alone — they can spread the infection"
    ],
    seeDoctor: [
      "On the scalp or in the beard — these need prescription oral antifungals",
      "No improvement after two weeks of over-the-counter treatment",
      "Spreading rapidly, or you have diabetes or a weakened immune system"
    ]
  },

  rosacea: {
    label: "Rosacea",
    severity: "moderate",
    aliases: ["acnerosacea"],
    summary:
      "Persistent facial redness with flushing, visible vessels and sometimes bumps. Managed by controlling triggers.",
    immediate: [
      "Rinse with cool water and pat dry very gently",
      "Apply a bland, fragrance-free moisturiser",
      "Move somewhere cool — heat drives flushing"
    ],
    remedies: [
      "Broad-spectrum SPF 30+ mineral sunscreen daily (zinc or titanium based)",
      "Keep a trigger diary — spicy food, alcohol, heat and stress are the usual culprits",
      "Green-tinted primer to visually neutralise redness",
      "Simplify your routine to a gentle cleanser and moisturiser only"
    ],
    avoid: [
      "Alcohol-based toners, exfoliants, and anything that stings on contact",
      "Hot showers, saunas and extreme temperature swings",
      "Topical steroids, which make rosacea worse over time"
    ],
    seeDoctor: [
      "Eye irritation, grittiness or redness — ocular rosacea needs treatment",
      "Thickening skin on the nose",
      "Redness that is worsening despite trigger avoidance"
    ]
  },

  hives: {
    label: "Hives (Urticaria)",
    severity: "moderate",
    aliases: ["urticaria", "welts", "wheals"],
    summary:
      "Raised, intensely itchy welts from a histamine reaction. Individual welts usually fade within 24 hours.",
    immediate: [
      "Take an over-the-counter non-drowsy antihistamine (cetirizine or loratadine)",
      "Cool compress or a cool shower to calm the itch",
      "Remove the likely trigger — new food, medication, soap or plant contact"
    ],
    remedies: [
      "Loose, soft cotton clothing over affected skin",
      "Colloidal oatmeal bath for widespread welts",
      "Calamine lotion for localised itching",
      "Keep a log of what preceded each episode"
    ],
    avoid: [
      "Hot showers and vigorous scratching, which release more histamine",
      "Alcohol and NSAIDs such as ibuprofen during a flare",
      "Tight or synthetic clothing"
    ],
    seeDoctor: [
      "EMERGENCY: swelling of lips, tongue, throat, or any difficulty breathing — call emergency services now",
      "Hives lasting more than six weeks",
      "Fever, joint pain, or welts leaving bruises behind"
    ]
  },

  vitiligo: {
    label: "Vitiligo",
    severity: "low",
    aliases: ["leucoderma", "leukoderma"],
    summary:
      "Loss of pigment-producing cells creating smooth white patches. Not contagious, painful or harmful to health.",
    immediate: [
      "Apply broad-spectrum SPF 30+ — depigmented skin burns very easily",
      "Cover exposed patches with clothing in strong sun"
    ],
    remedies: [
      "Daily sunscreen is the single most important step",
      "Cosmetic camouflage or self-tanner (dihydroxyacetone) evens tone if you want it",
      "Vitamin D levels are worth checking with your doctor",
      "Connect with a support community — psychological impact is real and common"
    ],
    avoid: [
      "Sunburn and deliberate tanning, which increase contrast and damage risk",
      "Skin trauma, cuts and friction, which can trigger new patches",
      "Unregulated 'cure' products sold online"
    ],
    seeDoctor: [
      "Patches spreading quickly",
      "You want treatment — early phototherapy and topicals work best",
      "Thyroid symptoms such as fatigue or weight change, which often accompany vitiligo"
    ]
  },

  warts: {
    label: "Warts",
    severity: "low",
    aliases: ["wart", "verruca", "hpvwart"],
    summary:
      "Rough growths caused by HPV infecting the top skin layer. Harmless and often clear on their own.",
    immediate: [
      "Cover it to reduce spread to others and to your own skin",
      "Wash hands after any contact"
    ],
    remedies: [
      "Over-the-counter salicylic acid, applied daily after soaking and filing",
      "Expect 8–12 weeks of consistent treatment — patience is the main ingredient",
      "Duct tape occlusion is a low-cost method with some evidence behind it",
      "Keep the area dry and use flip-flops in communal showers"
    ],
    avoid: [
      "Picking, biting or shaving over warts — this spreads them",
      "Sharing towels, razors or nail clippers",
      "Treating facial or genital warts with over-the-counter acid products"
    ],
    seeDoctor: [
      "Warts on the face, or genital warts",
      "Bleeding, rapidly changing, or painful growths",
      "You have diabetes or a weakened immune system"
    ]
  },

  melanoma: {
    label: "Possible skin cancer",
    severity: "urgent",
    aliases: ["skincancer", "malignantmelanoma", "basalcellcarcinoma", "squamouscellcarcinoma", "carcinoma", "bcc", "scc"],
    summary:
      "The model flagged features associated with skin cancer. This needs a doctor, not home treatment — and early detection matters enormously.",
    immediate: [
      "Book an appointment with a dermatologist or your GP now — this week, not eventually",
      "Photograph the lesion next to a ruler or coin so change can be tracked",
      "Do not cut, burn, freeze, scrape or apply any removal product to it"
    ],
    remedies: [
      "There is no home remedy for suspected skin cancer — professional assessment is the only appropriate step",
      "Protect the area from further sun exposure while you wait for your appointment",
      "Check the rest of your skin for other new or changing spots and note them for the appointment"
    ],
    avoid: [
      "'Black salve', escharotics or any online cancer-removal product — these cause serious harm",
      "Waiting to see whether it resolves on its own",
      "Further sun exposure or tanning beds"
    ],
    seeDoctor: [
      "Go now. Use the ABCDE guide: Asymmetry, Border irregularity, Colour variation, Diameter over 6mm, Evolving",
      "Bleeding, itching, crusting or a sore that will not heal",
      "Any mole that looks different from your others"
    ]
  },

  nevus: {
    label: "Mole (Melanocytic Nevus)",
    severity: "low",
    aliases: ["mole", "melanocyticnevi", "melanocyticnevus", "nevi", "benignkeratosis", "seborrheickeratosis"],
    summary:
      "A common benign pigmented spot. Most moles are harmless — what matters is whether they change.",
    immediate: [
      "Photograph it with a ruler or coin for size reference so you can track changes",
      "Apply sunscreen to protect it"
    ],
    remedies: [
      "Monthly self-checks using the ABCDE guide",
      "Daily broad-spectrum SPF 30+",
      "Annual skin check if you have many moles, fair skin, or family history of skin cancer"
    ],
    avoid: [
      "Attempting to remove it yourself — this destroys the tissue a pathologist needs",
      "Tanning beds and unprotected sun exposure",
      "Repeated friction or irritation from clothing or jewellery"
    ],
    seeDoctor: [
      "Any change in size, shape, colour or texture",
      "Bleeding, itching or pain",
      "A mole that stands out as different from your others"
    ]
  },

  shingles: {
    label: "Shingles (Herpes Zoster)",
    severity: "urgent",
    aliases: ["herpeszoster", "zoster"],
    summary:
      "A painful blistering rash in a band on one side of the body, from reactivated chickenpox virus. Antivirals work best within 72 hours.",
    immediate: [
      "Contact a doctor today — antiviral treatment is far more effective started within 72 hours",
      "Cool compress on the rash for pain relief",
      "Keep the rash covered and loose"
    ],
    remedies: [
      "Calamine lotion for itching",
      "Colloidal oatmeal bath",
      "Over-the-counter pain relief as directed on the packet",
      "Rest — this is a systemic viral illness, not just a rash"
    ],
    avoid: [
      "Contact with newborns, pregnant people and anyone immunocompromised until blisters crust over",
      "Scratching or bursting blisters",
      "Adhesive dressings directly on blisters"
    ],
    seeDoctor: [
      "URGENT: rash near or around the eye — this threatens your sight",
      "Widespread rash, high fever, confusion or severe pain",
      "Pain persisting after the rash clears (postherpetic neuralgia)"
    ]
  },

  impetigo: {
    label: "Impetigo",
    severity: "moderate",
    aliases: ["schoolsores"],
    summary:
      "A contagious bacterial infection producing honey-coloured crusts, most often around the nose and mouth.",
    immediate: [
      "See a doctor — this usually needs prescription antibiotic cream or tablets",
      "Gently wash crusts with warm soapy water",
      "Cover the area and wash hands thoroughly after contact"
    ],
    remedies: [
      "Warm compress to soften and lift crusts",
      "Separate towels, flannels and bedding, hot-washed daily",
      "Keep fingernails short",
      "Stay off school or work until 48 hours of antibiotics, or until crusts have gone"
    ],
    avoid: [
      "Sharing towels, bedding, razors or clothing",
      "Scratching, which spreads it to new sites and to other people",
      "Sending children to school while lesions are weeping"
    ],
    seeDoctor: [
      "See one regardless — impetigo needs antibiotics to clear reliably",
      "Fever, spreading redness, or feeling generally unwell",
      "No improvement after three days of treatment"
    ]
  },

  coldsore: {
    label: "Cold Sore (Herpes Simplex)",
    severity: "low",
    aliases: ["herpessimplex", "fever blister", "feverblister", "hsv"],
    summary:
      "A cluster of blisters on or near the lip from HSV-1. Contagious while active; heals in 7–10 days.",
    immediate: [
      "Apply over-the-counter antiviral cream (aciclovir) at the very first tingle — timing is everything",
      "Cool compress to reduce swelling",
      "Wash hands after touching it, especially before touching your eyes"
    ],
    remedies: [
      "Lip balm with SPF, since sunlight is a common trigger",
      "Keep the area moisturised so it doesn't crack",
      "Over-the-counter pain relief if it's sore",
      "Note your triggers — stress, illness and sun are typical"
    ],
    avoid: [
      "Kissing and oral contact while blisters are present",
      "Sharing cups, cutlery, lip balm or towels",
      "Picking scabs, which delays healing and scars"
    ],
    seeDoctor: [
      "Sores near or in the eye — seek care urgently",
      "Frequent recurrences (more than six a year) — suppressive therapy exists",
      "Not healing after two weeks, or you are immunocompromised"
    ]
  },

  chickenpox: {
    label: "Chickenpox (Varicella)",
    severity: "moderate",
    aliases: ["varicella"],
    summary:
      "A very contagious viral illness with itchy blisters appearing in crops across the body.",
    immediate: [
      "Isolate from others until every blister has crusted over",
      "Cool bath with colloidal oatmeal or baking soda",
      "Calamine lotion on itchy spots"
    ],
    remedies: [
      "Paracetamol for fever — never aspirin in children",
      "Loose cotton clothing",
      "Mittens or short nails for children to limit scratching",
      "Plenty of fluids and rest"
    ],
    avoid: [
      "Aspirin in under-16s — risk of Reye's syndrome",
      "Contact with pregnant people, newborns and immunocompromised people",
      "Scratching, which causes permanent scarring"
    ],
    seeDoctor: [
      "Difficulty breathing, stiff neck, confusion or persistent high fever",
      "Blisters becoming hot, red, swollen or leaking pus",
      "Adult, pregnant, or immunocompromised — these cases need antivirals"
    ]
  },

  nailfungus: {
    label: "Nail Fungus (Onychomycosis)",
    severity: "low",
    aliases: ["onychomycosis", "tineaunguium", "fungalnail"],
    summary:
      "Fungal infection of the nail plate causing thickening, crumbling and yellow-brown discolouration.",
    immediate: [
      "Keep feet clean and completely dry, especially between the toes",
      "Trim and thin the nail carefully",
      "Start an over-the-counter antifungal nail lacquer"
    ],
    remedies: [
      "Antifungal lacquer daily — nails grow slowly, so expect 6–12 months",
      "Breathable shoes and moisture-wicking socks, changed daily",
      "Antifungal powder in shoes",
      "Disinfect nail clippers after every use"
    ],
    avoid: [
      "Nail polish and false nails over infected nails",
      "Barefoot walking in communal showers, pools and gyms",
      "Sharing clippers or files"
    ],
    seeDoctor: [
      "Diabetes, poor circulation or a weakened immune system — treat this professionally",
      "Pain, or the nail separating from the nail bed",
      "No improvement after three months of treatment"
    ]
  },

  healthy: {
    label: "Healthy Skin",
    severity: "low",
    aliases: ["normal", "normalskin", "nodisease", "clear", "clearskin"],
    summary:
      "No disease features detected in this image. Keep up a basic protective routine.",
    immediate: [
      "No action needed — nothing concerning was detected"
    ],
    remedies: [
      "Broad-spectrum SPF 30+ daily, even when overcast",
      "Gentle fragrance-free cleanser and moisturiser",
      "Monthly self-check for new or changing moles",
      "Stay hydrated and eat a varied diet"
    ],
    avoid: [
      "Tanning beds and unprotected midday sun",
      "Over-exfoliating, which damages the skin barrier",
      "Smoking, which accelerates skin ageing"
    ],
    seeDoctor: [
      "Any new spot that changes in size, shape or colour",
      "A sore that will not heal within three weeks",
      "Persistent itching, pain or unexplained rash"
    ]
  }
};

window.lookupCondition = function (rawLabel) {
  if (!rawLabel) return null;
  var key = String(rawLabel).toLowerCase().replace(/[^a-z]/g, "");
  if (!key) return null;

  var db = window.SKIN_CONDITIONS;

  if (db[key]) return db[key];

  for (var name in db) {
    var entry = db[name];
    var candidates = [name].concat(entry.aliases || []);
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i].replace(/[^a-z]/g, "");
      if (c && (key === c || key.indexOf(c) !== -1 || c.indexOf(key) !== -1)) {
        return entry;
      }
    }
  }
  return null;
};
