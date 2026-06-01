import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Gap from './components/Gap.jsx';
import Days from './components/Days.jsx';
import Capabilities from './components/Capabilities.jsx';
import Calculator from './components/Calculator.jsx';
import Pricing from './components/Pricing.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Cta from './components/Cta.jsx';
import { GlobalEffects } from './components/effects.jsx';

// Trailing period on the last line is added by Hero.jsx as an accent — don't
// include one here or you'll get "competitors do.."
const HEADLINE = "The unfair advantage isn't AI.\nIt's deploying it before your competitors do";

export default function App() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };

  return (
    <>
      <Nav onCta={scrollToContact} />
      <Hero headline={HEADLINE} onCta={scrollToContact} />
      <Gap animations={true} />
      <Days />
      <Capabilities />
      <Calculator />
      <Pricing />
      <Projects />
      <About />
      <Cta />
      <GlobalEffects />
    </>
  );
}
