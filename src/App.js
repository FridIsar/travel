import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const icon = L.icon({ 
  iconRetinaUrl:iconRetina, 
  iconUrl: iconMarker, 
  shadowUrl: iconShadow 
});
const supabaseUrl = 'https://rjpqxbwlcnkylrndqvcb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqcHF4YndsY25reWxybmRxdmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExMTQ4MDEsImV4cCI6MjAwNjY5MDgwMX0.jt9JRLIK5SR5Zj7pMiBZnxHKTNHaKpIYk8_TWOhvw8c"//process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: Positions } = await supabase
          .from('Positions')
          .select('*')
          .order('id', { ascending: false })
          .limit(1);
        setPosition(Positions);
        //console.log("test is a ", Positions[0].coordinates)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {position ? (
        <MapContainer center={position[0].coordinates} zoom={13} style={{ height: '100vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position[0].coordinates} icon={icon}>
          <Popup>
            Hi :) <br /> I should be around there!
          </Popup>
        </Marker>
      </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;