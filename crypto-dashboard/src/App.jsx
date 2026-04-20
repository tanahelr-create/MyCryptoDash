import{ Routes , Route , useNavigate} from 'react-router-dom';
import Analytiques from './navigation/analytiques';
import Transaction from './navigation/transactions';
import Portefeuille from './navigation/wallet';
import Parametre from './navigation/parametre';

import{FaBell, FaUser, FaSearch} from 'react-icons/fa';
import{FaArrowUp, FaArrowDown} from 'react-icons/fa';
import{AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer , PieChart, Pie, Cell, Label} from 'recharts';
import{useState,useEffect, use} from 'react';





function App() {

  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState('dashboard');

  const [connected, setConnected] = useState(false);

  const [marketData, setMarketData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);
  const [totalUsers, setTotalUsers] = useState(12450);
  const [transactions, setTransactions] = useState(328);

  const [ recherche, setRecherche] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [chargement, setChargement] = useState(false);

  const [notifications, setNotifications] = useState(null);
  const [nbNotifs, setNbNotifs]=useState(0);


  useEffect(() => {
    {/* pour la connexion du web socket */}
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.k.c);
      const time = new Date(data.k.t).toLocaleTimeString();
      setCurrentPrice(price);
      const open = parseFloat(data.k.o);
      setOpenPrice(open);
      const change = ((price - open) / open* 100).toFixed(2);
      setPriceChange(change);
      {/* pour prevenir quand il y a une forte baisse ou hausse */}
      if(Math.abs(change) > 1){
        setNotifications(change > 0 ? 'Hausse significative du BTC!' : 'Baisse significative du BTC!', change);
        setNbNotifs(prev => prev + 1);
        setTimeout(() => setNotifications(null), 5000);
      }

      setMarketData((prevData) => [...prevData.slice(-29), { time, price }]);
    };
    return () => ws.close();
  }, []);
{/* fonction pour simuler les utilisateurs */}
useEffect(() => {
  const interval = setInterval(() => {
    setTotalUsers((prev) => prev + Math.floor(Math.random() * 5));
    setTransactions((prev) => prev + Math.floor(Math.random() * 3));
  }, 3000);
  return () => clearInterval(interval);
}, []);


const assetData = [
  {name: 'BTC', value: 50},
  {name: 'ETH', value: 30},
  {name: 'LTC', value: 20},
  {name: 'XRP', value: 10},
]

const [recentActivities, setRecentActivities] = useState([
  {icon: '₿', Label: 'Achat de 0.5 BTC', time: "A l'instant", amount: '+$25,000', positive:true},
  {icon: 'Ξ', Label: 'Reçu 2.3 ETH', time: "Il y a 30 minutes", amount: '+3.719 ETH', positive:true},
  {icon: '🠗', Label: 'Retrait banque', time: "1 heure", amount: '-$1,000', positive:false},
]);
{/* fonction pour simuler des activités récentes */}
useEffect(() => {
  const activites= [
    {icon: '₿', Label: 'Achat de 0.5 BTC', time: "A l'instant", amount: '+$25,000', positive:true},
    {icon: 'Ξ', Label: 'Reçu 2.3 ETH', time: "Il y a 30 minutes", amount: '+3.719 ETH', positive:true},
    {icon: '🠗', Label: 'Retrait banque', time: "1 heure", amount: '-$1,000', positive:false},
  ];
  const interval = setInterval(() => {
    const random = activites[Math.floor(Math.random() * activites.length)];
    const newActivite = {
      ...random,
      time: "A l'instant",
      amount: random.positive ? `+$${Math.floor(Math.random() * 10000).toFixed(0)}` : `-$${Math.floor(Math.random() * 5000).toFixed(0)}`,
    };
    setRecentActivities((prev) => [newActivite, ...prev.slice(0, 2)]);
  },5000);
  return () => clearInterval(interval);
}, []);

const COLORS = ['#00ff9f', '#00e5ff', '#7b2fff', '#1a1a2e'];

const rechercheCrypto = async (nom) => {
  if(!nom) return setSearchResults(null);
  try {
    const reponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${nom}&vs_currencies=usd&include_24hr_change=true`);
    const data = await reponse.json();
    if(data[nom]){
      setSearchResults({ 
        nom: nom, 
        prix: data[nom].usd, 
        change: data[nom].usd_24h_change?.toFixed(2) 
      });
    } else {
      setSearchResults({ error: 'Crypto non trouvée' });
    }
  }catch (e) {
    setSearchResults({ error: 'Erreur de recherche' });
  }
  setChargement(false);
}


  return (
    <div className="tableau-root">
      {/* side bar */}
      <aside className="sideBar">
        <div className="sideBar-logo">
            <span className="logo-icon"></span>
            <span className="logo-text">MyCryptoBoard</span>
        </div>

       {/* naviagtion */} 
       <nav>
        <div className="nav-item" active onClick={()=> navigate('/')}> Dashboard</div>
        <div className="nav-item" onClick={()=> navigate('/analytiques')}> Analytiques</div>
        <div className="nav-item" onClick={()=> navigate('/transactions')}>Transactions</div>
        <div className="nav-item" onClick={()=> navigate('/portefeuille')}> Portefeuille</div>
        <div className="nav-item" onClick={()=> navigate('/parametres')}> Paramètres</div>
       </nav>

      </aside>
      {/* contenu principal*/}
      <div className="main">
                <header className="topbar">
          <span className="topbar-titre">Tableau de board</span>
          <div className="recherche-barre">
            <span><FaSearch /></span>
            <input placeholder="Rechercher une crypto..." value={recherche} onChange={(e) => setRecherche(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && rechercheCrypto(recherche)}/>
            {chargement && <span style={{color: '#00ff9f'}}>...</span>}
          </div>
          
          {searchResults && (
            <div className="result">
              {searchResults.error ? (
                <span className="error">{searchResults.error}</span>
              ) : (
                <div className="crypto-info">
                  <span className="search-name">{searchResults.nom}</span>
                  <span className="search-prix">${searchResults.prix.toLocaleString}</span>
                  <span className={searchResults.change >= 0 ? 'stat-change up' : 'stat-change down'}>
                    {searchResults.change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {searchResults.change}%
                  </span>
                  <span className="search-close" onClick={() => setSearchResults(null)}>X</span>
                </div>
              )}
            </div>
          )}

        <div className="topbar-actions">
          <div className="icon-btn notif-btn"> <FaBell /> {nbNotifs > 0 && <span className="notif-badge">{nbNotifs}</span>} </div>
          <div className="icon-btn"> <FaUser /> </div>
          <div className="statuts-indicator">
            <span className={connected ? 'statuts-dot connected' : 'statuts-dot '}></span>
            <span className="statut-text">{connected ? 'Connecté' : 'Déconnecté'}</span>
          </div>
        </div>
        </header>
        <Routes>
          <Route path="/" element ={ <>

        {/* contenu de ma page*/}

        <div className="contenu">
          {/* l'emplacement de mes cartes */}
          <div className="cartes">



            <div className="statistiques-cartes">
            <div className="statistique-label">Utilisateurs total</div>
            <div className="statistique-valeurs">{totalUsers.toLocaleString()}</div>
            <div className="stat-change up"> <FaArrowUp /> +2.4%</div>
            </div>

            <div className="statistiques-cartes">
            <div className="statistique-label">Transactions</div>
            <div className="statistique-valeurs">{transactions.toLocaleString()}</div>
            <div className="stat-change up"> <FaArrowUp /> +18%</div>
            </div>

            <div className="statistiques-cartes">
            <div className="statistique-label">Portefeuille</div>
            <div className="statistique-valeurs">${(currentPrice*0.5).toFixed(0)}</div>
            <div className="stat-change up"> <FaArrowUp /> +0.5 BTC</div>
            </div>
            
            <div className="statistiques-cartes">
            <div className="statistique-label">24h Change</div>
            <div className="statistique-valeurs">{priceChange}%</div>
            <div className={priceChange >= 0 ? "stat-change up" : "stat-change down"}>
              <FaArrowUp /> {priceChange >= 0 ? "Hausse" : "Baisse"}
            </div>
            </div>
          
          
        </div>
        {/* class de la gstion de mon graph et du donut*/}
        <div className="mid-row">
            {/* pour placer mon graph à gauche*/}
            <div className="panel">
              <div className="panel-titre">Performance du marché</div>
              <div className="chart-header">
                <span className="chart-pair">BTC/USD</span>
                <span className="price-display">${currentPrice.toFixed(0)}<span className="price-change"> <FaArrowUp /> live</span></span>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={marketData} >
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff9f" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00ff9f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#3d6b52" />
                  <YAxis domain={['auto','auto']} stroke="#3d6b52" />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#00ff9f" strokeWidth={2} fill="url(#grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* pour placer mon donut à droite*/}
            <div className="panel">
              <div className="panel-titre">Asset distribution</div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) =>[`${value}%`,name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-legend">
                {assetData.map((entry, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: COLORS[index] }}></span>
                    <span className="legend-name">{entry.name}</span>
                    <span className="legend-value">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>


            </div>
            {/* pour placer mon tableau d'activité récente*/}
            <div className="panel">
              <div className="panel-titre">Activité récente</div>
              
                {recentActivities.map((item, index) => (
                  <div key={index} className="activite-item">
                    <div className="activite-icon">{item.icon}</div>
                    <div className="activite-label">
                      <div className="activite-name">{item.Label}</div>
                      <div className="activite-time">{item.time}</div>
                    </div>
                    <span className= {item.positive ? 'activite-amount positive' : 'activite-amount negative' }>{item.amount}</span>
                  </div>
                ))}
                    </div>
      </div>
       </>
      } />
      <Route path="/analytiques" element={<Analytiques />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/portefeuille" element={<Portefeuille />} />
      <Route path="/parametres" element={<Parametre />} />
      
        </Routes>
              <footer className='footer'>
        <div className="footer-left">
          <span className="footer-logo">MyCryptoBoard</span>
          <p className="footer-desc">Votre plateforme de gestion de crypto-monnaies</p>
        </div>
        <div className="footer-center">
          <div className="footer-price">
            <span className="footer-">₿ BTC</span>
            <span className='footer-value'>${currentPrice.toFixed(0)}</span>
            <span className={priceChange>=0? 'footer-change up' : 'footer-change down'}>{priceChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}{priceChange}%</span>
          </div>
          
        </div>
        <div className="footer-right">
          <span className='footer-statuts'>
            <span className={connected ? 'statuts dot connected' : 'statuts dot'}></span>
            {connected ? 'Connecté' : 'Déconnecté'}
          </span>
          <p className="footer-copy">© 2026 Vanila's Group. Tableau de bord confidentiel. Tous droits réservés. Toute reproduction ou distribution non autorisée est strictement interdite.</p>
        </div>
      </footer>
    </div>
  </div>
  );
}

export default App;