import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

const SchedulingModal = ({ isOpen, onClose, selectedService }: SchedulingModalProps) => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Set service when selectedService prop changes
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    } else {
      setService("");
    }
  }, [selectedService]);

  const handleSchedule = async () => {
    if (!clientName || !clientPhone || !service) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Preparar mensagem do WhatsApp
      const whatsappMessage = `Olá! Gostaria de agendar um procedimento estético.

👤 *Nome:* ${clientName}
📱 *Telefone:* ${clientPhone}
💄 *Serviço:* ${service}${notes ? `\n📝 *Observações:* ${notes}` : ''}`;

      // Redirecionar para WhatsApp
      const whatsappUrl = `https://wa.me/5571991728256?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Agendamento enviado!",
        description: "Você será redirecionado para o WhatsApp para confirmar o agendamento.",
      });

      onClose();
      
      // Reset form
      setClientName("");
      setClientPhone("");
      setService("");
      setNotes("");
      
    } catch (error) {
      console.error("Erro ao processar agendamento:", error);
      toast({
        title: "Erro",
        description: "Erro ao processar agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-gradient-card border-0 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Agendar Procedimento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Dados do Cliente */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados do Cliente
            </Label>
            
            <div>
              <Label htmlFor="name" className="text-sm text-muted-foreground">
                Nome Completo *
              </Label>
              <Input
                id="name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Seu nome completo"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm text-muted-foreground">
                WhatsApp *
              </Label>
              <Input
                id="phone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="service" className="text-sm text-muted-foreground">
                Serviço Desejado *
              </Label>
              <Input
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Ex: Limpeza de Pele, Massagem Relaxante..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm text-muted-foreground">
                Observações
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alguma observação especial..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="pt-4 space-y-3">
            <Button 
              onClick={handleSchedule}
              disabled={isLoading}
              className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
            >
              {isLoading ? "Processando..." : "Confirmar Agendamento"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulingModal;