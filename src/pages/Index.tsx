import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Import service images
import drenagemImage from "@/assets/drenagem-linfatica.jpg";
import massagemImage from "@/assets/massagem-relaxante.jpg";
import limpezaImage from "@/assets/limpeza-pele.jpg";
import micropigmentacaoImage from "@/assets/micropigmentacao.jpg";
import liberacaoImage from "@/assets/liberacao-miofascial.jpg";
interface Service {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  duration: string;
  price: string;
}
const services: Service[] = [{
  id: "drenagem-linfatica",
  title: "Drenagem Linfática",
  image: drenagemImage,
  shortDescription: "Técnica que estimula o sistema linfático para reduzir inchaços",
  fullDescription: "Massagem especializada que ativa a circulação linfática, promovendo a eliminação de toxinas e redução de edemas. Ideal para pós-operatório e tratamento de celulite.",
  benefits: ["Redução significativa de inchaços e edemas", "Eliminação natural de toxinas do organismo", "Melhora da circulação linfática", "Alívio da sensação de pernas pesadas", "Recuperação acelerada pós-cirúrgica", "Diminuição da aparência de celulite"],
  duration: "60 minutos",
  price: "A partir de R$ 120"
}, {
  id: "massagem-relaxante",
  title: "Massagem Relaxante",
  image: massagemImage,
  shortDescription: "Alívio de tensões e relaxamento muscular profundo",
  fullDescription: "Técnica de massagem que promove relaxamento físico e mental, aliviando tensões musculares e reduzindo o estresse do dia a dia.",
  benefits: ["Relaxamento profundo de corpo e mente", "Alívio eficaz de tensões musculares", "Redução significativa do estresse", "Melhora da qualidade do sono", "Aumento da sensação de bem-estar", "Renovação das energias vitais"],
  duration: "90 minutos",
  price: "A partir de R$ 150"
}, {
  id: "limpeza-pele",
  title: "Limpeza de Pele",
  image: limpezaImage,
  shortDescription: "Tratamento facial profundo para renovação da pele",
  fullDescription: "Procedimento que remove impurezas, cravos e células mortas, promovendo a renovação celular e deixando a pele mais saudável e luminosa.",
  benefits: ["Remoção completa de impurezas e cravos", "Renovação celular da pele", "Pele mais luminosa e saudável", "Melhora da textura facial", "Prevenção de acne e espinhas", "Hidratação profunda da pele"],
  duration: "75 minutos",
  price: "A partir de R$ 100"
}, {
  id: "micropigmentacao",
  title: "Micropigmentação de Sobrancelha",
  image: micropigmentacaoImage,
  shortDescription: "Técnica que realça e define o formato das sobrancelhas",
  fullDescription: "Procedimento semi-permanente que cria pelos naturais através de pigmentação, corrigindo falhas e criando o design ideal para cada rosto.",
  benefits: ["Sobrancelhas perfeitamente definidas", "Correção de falhas naturais", "Design personalizado para seu rosto", "Resultado natural e duradouro", "Economia de tempo na rotina diária", "Autoestima renovada"],
  duration: "2-3 horas",
  price: "A partir de R$ 400"
}, {
  id: "liberacao-miofascial",
  title: "Liberação Miofascial",
  image: liberacaoImage,
  shortDescription: "Técnica para alívio de tensões musculares e fasciais",
  fullDescription: "Terapia manual que trabalha a fáscia muscular, promovendo alívio de dores, melhora da mobilidade e relaxamento profundo.",
  benefits: ["Alívio eficaz de dores musculares", "Melhora significativa da mobilidade", "Relaxamento muscular profundo", "Correção de desequilíbrios posturais", "Aumento da flexibilidade", "Bem-estar físico renovado"],
  duration: "60 minutos",
  price: "A partir de R$ 140"
}];
const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  const handleSchedule = (service: Service) => {
    // Here you would integrate with Google Calendar API and WhatsApp
    toast({
      title: "Agendamento Solicitado",
      description: `Em breve entraremos em contato para agendar seu ${service.title}`
    });
    handleCloseModal();
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section id="sobre" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sobre <span className="bg-gradient-hero bg-clip-text text-transparent">Nossa Clínica</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Com mais de 5 anos de experiência no mercado de estética, nossa clínica se dedica 
              a oferecer tratamentos personalizados e de alta qualidade. Utilizamos as técnicas 
              mais avançadas e equipamentos de última geração para garantir resultados excepcionais 
              e a satisfação completa de nossos clientes.
            </p>
            
          </div>
        </div>
      </section>

      <section id="servicos" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos <span className="bg-gradient-hero bg-clip-text text-transparent">Serviços</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra nossos tratamentos exclusivos, desenvolvidos para realçar sua beleza 
              natural e proporcionar momentos únicos de relaxamento e bem-estar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map(service => <ServiceCard key={service.id} image={service.image} title={service.title} description={service.shortDescription} onLearnMore={() => handleLearnMore(service)} />)}
          </div>
        </div>
      </section>
      
      <Footer />
      
      <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={handleCloseModal} onSchedule={handleSchedule} />
    </div>;
};
export default Index;