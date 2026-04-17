// KalkulackaDopravy.jsx
// Nutné: npm install @react-google-maps/api
// API klíč dejte do .env: REACT_APP_GOOGLE_MAPS_API_KEY=váš_klíč
// (nebo VITE_GOOGLE_MAPS_API_KEY pro Vite)

import React, { useState, useRef, useCallback } from "react";
import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

const P = "#7C3AED", PL = "#EDE9FE", PLM = "#DDD6FE";
const SRF = "#FFFFFF", SRFL = "#F7F5FF";
const TX = "#18181B", MUT = "#52525B", FAINT = "#A1A1AA", BRD = "#E4E0F5";
const GBG = "#DCFCE7", GFG = "#166534";

const ORIGIN = "Nám. Dr. E. Beneše, 460 01 Liberec";
const PRICE_PER_KM = 8;
const TRIPS_MULTIPLIER = 4;
const FREE_RADIUS_KM = 10;
const LIBEREC_CENTER = { lat: 50.7671, lng: 15.0562 };

const MAPS_API_KEY =
  (typeof process !== "undefined" && process.env?.REACT_APP_GOOGLE_MAPS_API_KEY) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_MAPS_API_KEY) ||
  "YOUR_GOOGLE_MAPS_API_KEY";

const libraries = ["places"];

function Chip({ children }) {
  return (
    <span style={{ display: "inline-block", background: PL, color: P,
      fontWeight: 800, fontSize: 11, letterSpacing: 1.5, padding: "5px 14px",
      borderRadius: 9999, textTransform: "uppercase",
      fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>
      {children}
    </span>
  );
}

export default function KalkulackaDopravy() {
  const [addressText, setAddressText] = useState("");
  const [distanceKm, setDistanceKm] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [markerPos, setMarkerPos] = useState(null);

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  const calculateDistance = (destinationInput) => {
    setError("");
    if (!window.google) return;
    setIsCalculating(true);
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      { origins: [ORIGIN], destinations: [destinationInput],
        travelMode: window.google.maps.TravelMode.DRIVING },
      (response, status) => {
        setIsCalculating(false);
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = distanceInMeters / 1000;
          setDistanceKm(distanceInKm.toFixed(1));
          if (distanceInKm <= FREE_RADIUS_KM) {
            setTotalPrice(0); setDiscountedPrice(0);
          } else {
            const billableDistance = distanceInKm - FREE_RADIUS_KM;
            const exactPrice = billableDistance * PRICE_PER_KM * TRIPS_MULTIPLIER;
            setTotalPrice(Math.ceil(exactPrice));
            setDiscountedPrice(Math.floor(exactPrice / 100) * 100);
          }
        } else {
          setError("Nepodařilo se vypočítat trasu. Zkuste adresu zadat přesněji.");
          setDistanceKm(null); setTotalPrice(null);
        }
      }
    );
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry) return;
      const location = place.geometry.location;
      const latLng = { lat: location.lat(), lng: location.lng() };
      setAddressText(place.formatted_address || place.name);
      setMarkerPos(latLng);
      if (mapRef.current) { mapRef.current.panTo(latLng); mapRef.current.setZoom(13); }
      calculateDistance(latLng);
    }
  };

  const handleMapClick = useCallback((event) => {
    const latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPos(latLng);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) setAddressText(results[0].formatted_address);
      else setAddressText("Vybrané místo na mapě");
      calculateDistance(latLng);
    });
  }, []);

  const onLoadMap = useCallback((map) => { mapRef.current = map; }, []);

  const inputStyle = {
    width: "100%", boxSizing: "border-box", background: SRFL,
    border: `1px solid ${BRD}`, borderRadius: 12, padding: "15px 16px",
    fontSize: 15, outline: "none", transition: "border .2s, box-shadow .2s",
    fontFamily: "'Manrope',sans-serif", color: TX,
  };

  if (!isLoaded) return (
    <div style={{ textAlign: "center", padding: 40, color: MUT, fontSize: 14 }}>
      Načítání kalkulačky dopravy…
    </div>
  );

  return (
    <div style={{ background: SRF, borderRadius: 22, padding: "36px 32px",
      boxShadow: "0 16px 50px rgba(0,0,0,.05)", border: `1px solid ${BRD}` }}>
      <Chip>Kalkulačka dopravy</Chip>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: TX,
        marginBottom: 8, letterSpacing: -0.5 }}>
        Zjistěte cenu za dopravu
      </h2>
      <p style={{ color: MUT, fontSize: 14, lineHeight: 1.65, marginBottom: 22 }}>
        Prvních <strong>{FREE_RADIUS_KM} km máte zcela zdarma</strong>. V ceně je vždy
        zahrnut dovoz, instalace, deinstalace a odvoz hradu.
      </p>

      <div style={{ position: "relative", width: "100%", marginBottom: 20 }}>
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={handlePlaceChanged}
          options={{ componentRestrictions: { country: "cz" } }}>
          <input
            type="text" value={addressText}
            onChange={(e) => setAddressText(e.target.value)}
            placeholder="📍 Zadejte adresu místa konání..."
            style={inputStyle}
            onFocus={(e) => { e.target.style.border = `1px solid ${P}`; e.target.style.boxShadow = `0 0 0 3px ${PLM}`; }}
            onBlur={(e) => { e.target.style.border = `1px solid ${BRD}`; e.target.style.boxShadow = "none"; }}
            onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
          />
        </Autocomplete>
      </div>

      <div style={{ height: 240, borderRadius: 14, overflow: "hidden",
        border: `1px solid ${BRD}`, marginBottom: 20 }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={LIBEREC_CENTER} zoom={10}
          onClick={handleMapClick} onLoad={onLoadMap}
          options={{ streetViewControl: false, mapTypeControl: false,
            fullscreenControl: false, clickableIcons: false }}>
          {markerPos && <Marker position={markerPos} />}
        </GoogleMap>
      </div>

      {isCalculating && (
        <div style={{ textAlign: "center", padding: "16px", color: MUT, fontSize: 14 }}>
          ⏳ Počítám trasu…
        </div>
      )}

      {error && (
        <div style={{ color: "#b91c1c", background: "#fef2f2", padding: "12px 16px",
          borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
          ⚠️ {error}
        </div>
      )}

      {distanceKm !== null && totalPrice !== null && !isCalculating && (
        <div style={{ background: SRFL, borderRadius: 16, border: `1px solid ${PLM}`,
          padding: 22, animation: "fadeUp .3s ease" }}>
          <div style={{ display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: MUT, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                Trasa celkem: {distanceKm} km
              </div>
              {parseFloat(distanceKm) <= FREE_RADIUS_KM ? (
                <div style={{ color: GFG, fontSize: 14, fontWeight: 700 }}>
                  ✓ Spadáte do zóny {FREE_RADIUS_KM} km zdarma!
                </div>
              ) : (
                <div style={{ color: TX, fontSize: 14, fontWeight: 600 }}>
                  Účtujeme {Math.max(0, (distanceKm - FREE_RADIUS_KM).toFixed(1))} km navíc
                </div>
              )}
              <ul style={{ padding: 0, margin: "10px 0 0", listStyle: "none",
                fontSize: 13, color: MUT }}>
                <li style={{ marginBottom: 3 }}>✓ Dovoz a instalace hradu</li>
                <li>✓ Deinstalace a odvoz zpět</li>
              </ul>
            </div>
            <div style={{ textAlign: "right" }}>
              {parseFloat(distanceKm) <= FREE_RADIUS_KM ? (
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 30, fontWeight: 900, color: GFG, letterSpacing: -1 }}>
                  ZDARMA
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 12, color: MUT, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                    Standardní cena
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 28, fontWeight: 900, color: MUT, letterSpacing: -1,
                    textDecoration: "line-through" }}>
                    {totalPrice} Kč
                  </div>
                </>
              )}
            </div>
          </div>

          {parseFloat(distanceKm) > FREE_RADIUS_KM && (
            <div style={{ background: discountedPrice === 0
                ? GBG : "linear-gradient(135deg,#7C3AED 0%,#A78BFA 100%)",
              color: discountedPrice === 0 ? GFG : "#fff",
              padding: "16px 18px", borderRadius: 12, marginBottom: 16,
              boxShadow: discountedPrice === 0 ? "none" : "0 6px 18px rgba(124,58,237,.22)" }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>
                    {discountedPrice === 0 ? "Jste kousek za hranicí!" : "Bonus pro vás!"}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>
                    Cenu za dopravu zaokrouhlujeme vždy dolů na celé stovky.
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, textTransform: "uppercase",
                    fontWeight: 700, opacity: 0.8 }}>Zaplatíte pouze</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 26, fontWeight: 900, letterSpacing: -1 }}>
                    {discountedPrice === 0 ? "ZDARMA" : `${discountedPrice} Kč`}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            style={{ width: "100%", padding: "14px", borderRadius: 12,
              background: P, color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15,
              transition: "transform .15s, box-shadow .15s",
              boxShadow: "0 5px 18px rgba(124,58,237,.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => document.getElementById("kontakt-formular")?.scrollIntoView({ behavior: "smooth" })}>
            Mám zájem – Přejít k rezervaci →
          </button>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: FAINT }}>
            ⚠️ K místu instalace je nutný příjezd pro dodávku nebo zpevněná cesta pro rudlík.
          </div>
        </div>
      )}
    </div>
  );
}