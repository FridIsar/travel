import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rjpqxbwlcnkylrndqvcb.supabase.co'
const supabaseKey = "l"//process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: Positions, error } = await supabase
          .from('Positions')
          .select('coordinates')
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
        <Marker position={position[0].coordinates}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
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

{/* <MapContainer center={position} zoom={13} style={{ height: '100vh' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}