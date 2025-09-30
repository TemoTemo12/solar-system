import { useState } from "react";

const initialPlanets = [
  {
    name: "Mercury",
    size: 6,
    speed: 0.24,
    distance: 120, // Moved Mercury a bit farther from the sun
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    info: "Mercury is the smallest planet."
  },
  {
    name: "Venus",
    size: 12,
    speed: 0.62,
    distance: 160,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    info: "Venus is the hottest planet."
  },
  {
    name: "Earth",
    size: 14,
    speed: 1,
    distance: 220,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    info: "Earth is our home."
  },
  {
    name: "Mars",
    size: 10,
    speed: 1.88,
    distance: 280,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    info: "Mars is known as the Red Planet."
  },
  {
    name: "Jupiter",
    size: 30,
    speed: 11.86,
    distance: 380,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
    info: "Jupiter is the largest planet."
  },
  {
    name: "Saturn",
    size: 26,
    speed: 29.46,
    distance: 480,
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    info: "Saturn has stunning rings."
  },
  {
    name: "Uranus",
    size: 20,
    speed: 84.01,
    distance: 560,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    info: "Uranus rotates on its side."
  },
  {
    name: "Neptune",
    size: 18,
    speed: 164.79,
    distance: 640,
    img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    info: "Neptune has the strongest winds."
  },
];

export default function SolarSystem() {
  // Factor to slow down the orbit speeds (larger factor = slower orbits)
  const speedFactor = 30;
  
  const [planets, setPlanets] = useState(initialPlanets);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [zoomedPlanet, setZoomedPlanet] = useState(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlanet, setNewPlanet] = useState({
    name: "",
    color: "#ffffff",
    size: "",
    speed: "",
    distance: "",
    img: "",
    info: "Custom planet",
  });

  const addPlanet = () => {
    setPlanets([
      ...planets,
      { 
        ...newPlanet, 
        size: Number(newPlanet.size), 
        speed: Number(newPlanet.speed), 
        distance: Number(newPlanet.distance) 
      }
    ]);
    setNewPlanet({
      name: "",
      color: "#ffffff",
      size: "",
      speed: "",
      distance: "",
      img: "",
      info: "Custom planet",
    });
    setShowAddForm(false);
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{
        backgroundImage:
          "url(https://upload.wikimedia.org/wikipedia/commons/e/e7/Space_background.jpg)",
        backgroundSize: "cover",
      }}
    >
      {/* Menu */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg"
        >
          Menu
        </button>
        {menuOpen && (
          <div className="absolute mt-2 p-4 bg-gray-900 text-white rounded-lg shadow-lg w-64">
            <label className="block mb-2">Speed:</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(e.target.value)}
              className="w-full"
            />
            <button
              onClick={() => setIsStopped(!isStopped)}
              className="block mt-2 px-4 py-2 bg-red-600 text-white rounded-lg w-full"
            >
              {isStopped ? "Resume Time" : "Stop Time"}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
            >
              Add Planet
            </button>
            {showAddForm && (
              <div className="mt-2 p-2 bg-gray-800 rounded-lg">
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={newPlanet.name}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, name: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                />
                <input
                  type="text"
                  placeholder="Image URL (or leave blank to use color)"
                  value={newPlanet.img}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, img: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                />
                <input
                  type="color"
                  value={newPlanet.color}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, color: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                  title="Pick a color if no image is provided"
                />
                <input
                  type="number"
                  placeholder="Enter Size in px (e.g., 10)"
                  value={newPlanet.size}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, size: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                />
                <input
                  type="number"
                  placeholder="Enter Orbit Speed (e.g., 1)"
                  value={newPlanet.speed}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, speed: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                />
                <input
                  type="number"
                  placeholder="Enter Orbit Distance in px (e.g., 700)"
                  value={newPlanet.distance}
                  onChange={(e) =>
                    setNewPlanet({ ...newPlanet, distance: e.target.value })
                  }
                  className="mb-1 p-1 w-full"
                />
                <button
                  onClick={addPlanet}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg w-full"
                >
                  Add Custom Planet
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sun */}
      <div
        className="absolute w-24 h-24 bg-yellow-500 rounded-full shadow-[0_0_50px_20px_rgba(255,215,0,0.8)] cursor-pointer"
        onMouseEnter={() =>
          setHoveredPlanet({ name: "Sun", info: "The center of our solar system." })
        }
        onMouseLeave={() => setHoveredPlanet(null)}
        onClick={() =>
          setZoomedPlanet({
            name: "Sun",
            info: "The center of our solar system.",
            img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Sun.jpg"
          })
        }
      ></div>

      {/* Planets */}
      {planets.map((planet, index) => (
        <div
          key={planet.name + index}
          className="absolute animate-spin"
          style={{
            width: `${planet.distance}px`,
            height: `${planet.distance}px`,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            animationDuration: `${(planet.speed * speedFactor) / speedMultiplier}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isStopped ? "paused" : "running",
          }}
        >
          <div
            className="absolute flex flex-col items-center"
            style={{
              top: "50%",
              left: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {planet.img ? (
              <img
                src={planet.img}
                alt={planet.name}
                className="cursor-pointer rounded-full"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                }}
                onMouseEnter={() => setHoveredPlanet(planet)}
                onMouseLeave={() => setHoveredPlanet(null)}
                onClick={() => setZoomedPlanet(planet)}
              />
            ) : (
              <div
                className="cursor-pointer rounded-full"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  backgroundColor: planet.color,
                }}
                onMouseEnter={() => setHoveredPlanet(planet)}
                onMouseLeave={() => setHoveredPlanet(null)}
                onClick={() => setZoomedPlanet(planet)}
              ></div>
            )}
            <span className="text-white text-xs">{planet.name}</span>
          </div>
        </div>
      ))}

      {/* Hover Info */}
      {hoveredPlanet && (
        <div className="absolute bottom-10 p-4 bg-gray-900 text-white rounded-xl shadow-lg">
          <h2 className="text-lg font-bold">{hoveredPlanet.name}</h2>
          <p className="text-sm">{hoveredPlanet.info}</p>
        </div>
      )}

      {/* Zoomed Planet Modal */}
      {zoomedPlanet && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded-lg relative">
            <button
              onClick={() => setZoomedPlanet(null)}
              className="absolute top-2 right-2 text-white"
            >
              Close
            </button>
            {zoomedPlanet.img ? (
              <img
                src={zoomedPlanet.img}
                alt={zoomedPlanet.name}
                className="rounded-full mb-2"
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: zoomedPlanet.color,
                  borderRadius: "50%",
                }}
                className="mb-2"
              ></div>
            )}
            <h2 className="text-xl text-white text-center">{zoomedPlanet.name}</h2>
            <p className="text-sm text-white text-center">{zoomedPlanet.info}</p>
          </div>
        </div>
      )}
    </div>
  );
}
