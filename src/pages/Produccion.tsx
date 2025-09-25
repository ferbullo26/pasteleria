import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Plus, Package } from 'lucide-react';

const Produccion = () => {
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: '',
    lote: '',
    observaciones: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const productos = [
    'Torta Chocolate',
    'Torta Vainilla',
    'Cupcakes Variados',
    'Pan Dulce',
    'Croissants',
    'Galletas Decoradas',
    'Macarons',
    'Cheesecake'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock submission - replace with Supabase insert when connected
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Lote registrado",
        description: `${formData.cantidad} unidades de ${formData.producto} agregadas a producción`,
      });

      // Reset form
      setFormData({
        producto: '',
        cantidad: '',
        lote: '',
        observaciones: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el lote de producción",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Producción</h2>
          <p className="text-muted-foreground">Registro de lotes de producción</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Nuevo Lote</span>
            </CardTitle>
            <CardDescription>
              Registra un nuevo lote de producción en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="producto">Producto</Label>
                <Select 
                  value={formData.producto} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, producto: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productos.map((producto) => (
                      <SelectItem key={producto} value={producto}>
                        {producto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    placeholder="0"
                    value={formData.cantidad}
                    onChange={(e) => setFormData(prev => ({ ...prev, cantidad: e.target.value }))}
                    min="1"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lote">Código de Lote</Label>
                  <Input
                    id="lote"
                    placeholder="L001-240925"
                    value={formData.lote}
                    onChange={(e) => setFormData(prev => ({ ...prev, lote: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Notas adicionales sobre el lote..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData(prev => ({ ...prev, observaciones: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="bakery"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Lote"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Estado Actual</span>
            </CardTitle>
            <CardDescription>
              Información sobre la producción del día
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary-light/20 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">⚡ Funcionalidad Completa</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Una vez conectado Supabase, este módulo insertará automáticamente los registros 
                en la tabla <code>lotes_produccion</code>.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <span className="text-sm font-medium">Lotes Hoy</span>
                <span className="text-lg font-bold text-primary">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                <span className="text-sm font-medium">Total Unidades</span>
                <span className="text-lg font-bold text-accent">156</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Último Lote</span>
                <span className="text-sm text-muted-foreground">L012-240925</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Produccion;