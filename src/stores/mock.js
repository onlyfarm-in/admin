export const DISTRICTS = [
  'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri',
  'Dindigul','Erode','Kallakurichi','Kancheepuram','Kanyakumari','Karur',
  'Krishnagiri','Madurai','Nagapattinam','Namakkal','Nilgiris','Perambalur',
  'Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga','Tenkasi',
  'Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli',
  'Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur',
  'Vellore','Viluppuram','Virudhunagar'
]

export const PRODUCE = [
  { id:1, tamil:'தக்காளி', english:'Tomato', category:'Vegetable', unit:'kg', active:true },
  { id:2, tamil:'வெங்காயம்', english:'Onion', category:'Vegetable', unit:'kg', active:true },
  { id:3, tamil:'உருளைக்கிழங்கு', english:'Potato', category:'Vegetable', unit:'kg', active:true },
  { id:4, tamil:'கத்தரிக்காய்', english:'Brinjal', category:'Vegetable', unit:'kg', active:true },
  { id:5, tamil:'வாழைப்பழம்', english:'Banana', category:'Fruit', unit:'dozen', active:true },
  { id:6, tamil:'மாம்பழம்', english:'Mango', category:'Fruit', unit:'kg', active:true },
  { id:7, tamil:'தேங்காய்', english:'Coconut', category:'Fruit', unit:'piece', active:true },
  { id:8, tamil:'கீரை', english:'Spinach', category:'Vegetable', unit:'bunch', active:true },
  { id:9, tamil:'முருங்கைக்காய்', english:'Drumstick', category:'Vegetable', unit:'bunch', active:true },
  { id:10, tamil:'பீர்க்கங்காய்', english:'Ridge Gourd', category:'Vegetable', unit:'kg', active:true },
  { id:11, tamil:'சாமை', english:'Little Millet', category:'Grain', unit:'kg', active:true },
  { id:12, tamil:'வரகு', english:'Kodo Millet', category:'Grain', unit:'kg', active:true },
  { id:13, tamil:'கம்பு', english:'Pearl Millet', category:'Grain', unit:'kg', active:true },
  { id:14, tamil:'மஞ்சள்', english:'Turmeric', category:'Spice', unit:'kg', active:true },
  { id:15, tamil:'மிளகாய்', english:'Chilli', category:'Spice', unit:'kg', active:true },
  { id:16, tamil:'கொத்தமல்லி', english:'Coriander', category:'Herb', unit:'bunch', active:true },
  { id:17, tamil:'கறிவேப்பிலை', english:'Curry Leaves', category:'Herb', unit:'bunch', active:true },
  { id:18, tamil:'பூண்டு', english:'Garlic', category:'Vegetable', unit:'kg', active:false },
  { id:19, tamil:'இஞ்சி', english:'Ginger', category:'Spice', unit:'kg', active:true },
  { id:20, tamil:'பப்பாளி', english:'Papaya', category:'Fruit', unit:'piece', active:true },
]

export const FARMERS = [
  { id:'F001', name:'முருகன் / Murugan',    phone:'98****1234', district:'Thanjavur',  joined:'2026-04-10', status:'active',   listings:3, badges:['Organic Farmer','Small Farmer'] },
  { id:'F002', name:'செல்வி / Selvi',       phone:'97****5678', district:'Dindigul',   joined:'2026-04-18', status:'active',   listings:5, badges:['Women Farmer','Native Crop'] },
  { id:'F003', name:'பாண்டியன் / Pandiyan', phone:'96****2345', district:'Madurai',    joined:'2026-05-01', status:'pending',  listings:0, badges:[] },
  { id:'F004', name:'கார்த்திக் / Karthik', phone:'94****6789', district:'Coimbatore', joined:'2026-05-03', status:'active',   listings:2, badges:['Multi-Crop'] },
  { id:'F005', name:'அன்பு / Anbu',         phone:'93****3456', district:'Salem',      joined:'2026-05-08', status:'pending',  listings:0, badges:[] },
  { id:'F006', name:'லலிதா / Lalitha',      phone:'92****7890', district:'Erode',      joined:'2026-04-22', status:'suspended',listings:0, badges:['Women Farmer'] },
  { id:'F007', name:'ராஜன் / Rajan',        phone:'91****4567', district:'Tiruchirappalli', joined:'2026-05-10', status:'active', listings:4, badges:['Area Verified'] },
]

export const BUYERS = [
  { id:'B001', name:'சுரேஷ் / Suresh',     phone:'99****1111', district:'Chennai',    joined:'2026-04-15', status:'active', contacts:8,  badge:'Verified Buyer' },
  { id:'B002', name:'மீனா / Meena',        phone:'98****2222', district:'Madurai',    joined:'2026-04-20', status:'active', contacts:3,  badge:'Regular Buyer' },
  { id:'B003', name:'அருண் / Arun',        phone:'97****3333', district:'Coimbatore', joined:'2026-05-02', status:'active', contacts:12, badge:'Bulk Buyer' },
  { id:'B004', name:'ஆசை / Asai',          phone:'96****4444', district:'Salem',      joined:'2026-05-07', status:'suspended', contacts:0, badge:'Regular Buyer' },
  { id:'B005', name:'நிறைவு / Niraivu NGO',phone:'95****5555', district:'Thanjavur',  joined:'2026-04-28', status:'active', contacts:22, badge:'Community Buyer' },
]

export const LISTINGS = [
  { id:'L001', farmer:'முருகன் / Murugan',    produce:'Tomato / தக்காளி',      district:'Thanjavur',  qty:'200 kg', price:'₹18/kg', posted:'2026-05-18', status:'active',  reports:0 },
  { id:'L002', farmer:'செல்வி / Selvi',       produce:'Banana / வாழைப்பழம்',   district:'Dindigul',   qty:'50 dozen',price:'₹40/dozen',posted:'2026-05-17', status:'active', reports:1 },
  { id:'L003', farmer:'கார்த்திக் / Karthik', produce:'Little Millet / சாமை',  district:'Coimbatore', qty:'100 kg', price:'₹65/kg', posted:'2026-05-16', status:'active',  reports:0 },
  { id:'L004', farmer:'ராஜன் / Rajan',        produce:'Turmeric / மஞ்சள்',     district:'Tiruchirappalli', qty:'50 kg', price:'₹120/kg', posted:'2026-05-15', status:'active', reports:2 },
  { id:'L005', farmer:'செல்வி / Selvi',       produce:'Drumstick / முருங்கைக்காய்', district:'Dindigul', qty:'30 bunch', price:'₹25/bunch', posted:'2026-05-14', status:'active', reports:0 },
]

export const ACTIVITY = [
  { time:'2h ago',  type:'farmer',  text:'New farmer registered: பாண்டியன் / Pandiyan (Madurai)' },
  { time:'3h ago',  type:'listing', text:'New listing: Turmeric 50kg by ராஜன் / Rajan (Tiruchirappalli)' },
  { time:'5h ago',  type:'report',  text:'Listing L004 flagged by buyer B002' },
  { time:'6h ago',  type:'buyer',   text:'New buyer registered: அருண் / Arun (Coimbatore)' },
  { time:'8h ago',  type:'farmer',  text:'New farmer registered: அன்பு / Anbu (Salem)' },
  { time:'10h ago', type:'listing', text:'New listing: Banana 50 dozen by செல்வி / Selvi (Dindigul)' },
  { time:'12h ago', type:'buyer',   text:'New buyer: நிறைவு / Niraivu NGO (Thanjavur)' },
]

export const MARKET_PRICES = [
  { produce:'Tomato / தக்காளி',         unit:'kg',    price:18, updated:'2026-05-19' },
  { produce:'Onion / வெங்காயம்',        unit:'kg',    price:22, updated:'2026-05-19' },
  { produce:'Banana / வாழைப்பழம்',     unit:'dozen', price:40, updated:'2026-05-18' },
  { produce:'Little Millet / சாமை',     unit:'kg',    price:65, updated:'2026-05-17' },
  { produce:'Turmeric / மஞ்சள்',       unit:'kg',    price:120, updated:'2026-05-17' },
  { produce:'Drumstick / முருங்கைக்காய்', unit:'bunch', price:25, updated:'2026-05-16' },
  { produce:'Coconut / தேங்காய்',      unit:'piece', price:18, updated:'2026-05-15' },
  { produce:'Chilli / மிளகாய்',        unit:'kg',    price:85, updated:'2026-05-14' },
]

export const AUDIT_LOG = [
  { id:1, admin:'Admin (you)',  action:'Approved farmer',         target:'F003 Pandiyan',  time:'2026-05-20 09:12' },
  { id:2, admin:'Admin (you)',  action:'Updated market price',    target:'Tomato ₹18/kg',  time:'2026-05-19 14:30' },
  { id:3, admin:'Admin (you)',  action:'Suspended buyer',         target:'B004 Asai',      time:'2026-05-18 11:05' },
  { id:4, admin:'Admin (you)',  action:'Assigned badge',          target:'F007 Rajan — Area Verified', time:'2026-05-17 16:22' },
  { id:5, admin:'Admin (you)',  action:'Removed listing',         target:'L004 (reported)', time:'2026-05-16 10:00' },
  { id:6, admin:'Admin (you)',  action:'Toggled feature',         target:'In-app messaging ON', time:'2026-05-15 09:45' },
  { id:7, admin:'Admin (you)',  action:'Broadcast sent',          target:'All Farmers — Price update', time:'2026-05-14 08:00' },
]

export const BROADCASTS = [
  { id:1, message:'Market prices updated for this week. Check listings before posting.', target:'All Farmers', sent:'2026-05-14 08:00', count:7 },
  { id:2, message:'Welcome to OnlyFarm! Buyer verification badges now live.', target:'All Users', sent:'2026-05-10 10:00', count:12 },
]

export const BLACKLIST = [
  { id:'BL001', phone:'90****9999', reason:'Repeated spam listings', action:'Temp ban (7 days)', date:'2026-05-18', admin:'Admin (you)', active:true },
]

export const DISTRICT_STATS = DISTRICTS.slice(0, 15).map((d, i) => ({
  district: d,
  farmers: Math.floor(Math.random() * 20 + 1),
  listings: Math.floor(Math.random() * 40 + 2),
  buyers: Math.floor(Math.random() * 15 + 1),
}))
