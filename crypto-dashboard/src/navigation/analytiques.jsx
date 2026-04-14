import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { mois: "Jan", btc: 400, eth: 240 },
  { mois: "Feb", btc: 300, eth: 180 },
  { mois: "Mar", btc: 500, eth: 300 },
  { mois: "Apr", btc: 200, eth: 120 },
  { mois: "May", btc: 600, eth: 360 },
  { mois: "Jun", btc: 400, eth: 240 },
];



function Analytic() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-titre">Analytiques</h1>
        <p className="page-subtit">Performances du marché sur les 6 derniers mois</p>
      </div>
      <div className="panel">
        {/* graph panel */}
        <div className="panel-titre">BTC vs ETH</div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(0,255,159,0.05)" />
            <XAxis dataKey="mois" stroke="#3d6b52"/>
            <YAxis stroke="#3d6b52" />
            <Tooltip />
            <Line type="monotone" dataKey="btc" stroke="#00ff9f" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="eth" stroke="#00e5ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* panel des statistique */}
      <div className="cartes">
        <div className="statistiques-cartes">
          <div className="statistique-label">Volume 24h</div>
          <div className="statistique-valeurs">$2.4B</div>
          <div className="stat-change up">+12%</div>
        </div>
        <div className="statistiques-cartes">
          <div className="statistique-label">Dominance BTC</div>
          <div className="statistique-valeurs">+20%</div>
          <div className="stat-change up">+0.08%</div>
        </div>
        <div className="statistiques-cartes">
          <div className="statistique-label">Cap. marché</div>
          <div className="statistique-valeurs">$2.4T</div>
          <div className="stat-change up">+0.08%</div>
        </div>
        <div className="statistiques-cartes">
          <div className="statistique-label">Peur & Avidité</div>
          <div className="statistique-valeurs">72</div>
          <div className="stat-change up">Avidité</div>
        </div>
      </div>
    </div>
  );
}

export default Analytic;