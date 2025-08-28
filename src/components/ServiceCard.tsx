import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  onLearnMore: () => void;
}

const ServiceCard = ({ image, title, description, onLearnMore }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-0">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <Button 
          variant="accent" 
          className="w-full transition-all duration-300 transform hover:scale-105"
          onClick={onLearnMore}
        >
          Saiba Mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;