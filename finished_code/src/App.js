import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from './home';
import Typing from './typing';
import Results from './results';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/typing" element={<Typing />} />
        <Route exact path="/result" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
