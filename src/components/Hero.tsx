import { Button } from "@/components/ui/button";
const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicos');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Desperte Sua
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Beleza Natural
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tratamentos estéticos personalizados com técnicas avançadas para realçar 
            sua beleza única. Agende sua consulta e transforme seu bem-estar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-gradient-hero hover:shadow-glow text-white font-semibold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105" onClick={scrollToServices}>
              Conheça Nossos Serviços
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Agendar Consulta
            </Button>
          </div>
          
          
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToServices} className="text-muted-foreground hover:text-primary transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>;
};
export default Hero;