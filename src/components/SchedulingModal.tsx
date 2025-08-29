import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, User } from "lucide-react";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

const SchedulingModal = ({ isOpen, onClose, selectedService }: SchedulingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("https://webhook.n8n.cloud/webhook/your-webhook-id");
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

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !clientName || !clientPhone || !service) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const schedulingData = {
      date: format(selectedDate, "dd/MM/yyyy", { locale: ptBR }),
      time: selectedTime,
      clientName,
      clientPhone,
      service,
      notes,
      timestamp: new Date().toISOString(),
    };

    try {
      // Enviar para webhook n8n
      if (webhookUrl && webhookUrl !== "https://webhook.n8n.cloud/webhook/your-webhook-id") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify(schedulingData),
        });
      }

      // Preparar mensagem do WhatsApp
      const whatsappMessage = `Olá! Gostaria de agendar um procedimento estético.

📅 *Data:* ${schedulingData.date}
⏰ *Horário:* ${schedulingData.time}
👤 *Nome:* ${clientName}
📱 *Telefone:* ${clientPhone}
💄 *Serviço:* ${service}${notes ? `\n📝 *Observações:* ${notes}` : ''}`;

      // Redirecionar para WhatsApp
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Agendamento enviado!",
        description: "Você será redirecionado para o WhatsApp para confirmar o agendamento.",
      });

      onClose();
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-0 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            Agendar Procedimento
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Calendário */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold text-foreground mb-3 block">
                Selecione a Data
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 || // Domingo
                  date.getDay() === 6    // Sábado
                }
                className={cn("p-3 pointer-events-auto border rounded-lg bg-background")}
                locale={ptBR}
              />
            </div>
          </div>

          {/* Formulário */}
          <div className="space-y-4">
            {/* Horários */}
            <div>
              <Label className="text-base font-semibold text-foreground mb-3 block flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário Disponível
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

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

              <div>
                <Label htmlFor="webhook" className="text-sm text-muted-foreground">
                  Webhook n8n (opcional)
                </Label>
                <Input
                  id="webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://webhook.n8n.cloud/webhook/your-webhook-id"
                  className="mt-1"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulingModal;