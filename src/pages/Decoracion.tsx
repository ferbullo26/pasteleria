import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Palette, Sparkles, Clock } from 'lucide-react';

const Decoracion = () => {
  const [formData, setFormData] = useState({
    producto: '',
    tipoDecoracion: '',
    tiempo: '',
    decorador: '',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const tiposDecoracion = [
    'Buttercream',
    'Fondant',
    'Glaseado',
    'Chocolate Derretido',
    'Flores de Azúcar',
    'Decoración con Manga',
    'Pintura Comestible',
    'Perlas y Brillos'
  ];

  const decoradores = [
    'María González',
    'Carlos Rodríguez',
    'Ana López',
    'Roberto Silva',
    'Laura Martínez'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock submission - replace with Supabase insert when connected
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Decoración registrada",
        description: `${formData.tipoDecoracion} en ${formData.producto} completada`,
      });

      // Reset form
      setFormData({
        producto: '',
        tipoDecoracion: '',
        tiempo: '',
        decorador: '',
        descripcion: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar la decoración",
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
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Decoración</h2>
          <p className="text-muted-foreground">Registro de trabajos de decoración</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Nueva Decoración</span>
            </CardTitle>
            <CardDescription>
              Registra un trabajo de decoración completado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="producto">Producto</Label>
                  <Input
                    id="producto"
                    placeholder="Torta de Chocolate"
                    value={formData.producto}
                    onChange={(e) => setFormData(prev => ({ ...prev, producto: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiempo">Tiempo (minutos)</Label>
                  <Input
                    id="tiempo"
                    type="number"
                    placeholder="45"
                    value={formData.tiempo}
                    onChange={(e) => setFormData(prev => ({ ...prev, tiempo: e.target.value }))}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoDecoracion">Tipo de Decoración</Label>
                <Select 
                  value={formData.tipoDecoracion} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, tipoDecoracion: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDecoracion.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="decorador">Decorador</Label>
                <Select 
                  value={formData.decorador} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, decorador: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el decorador" />
                  </SelectTrigger>
                  <SelectContent>
                    {decoradores.map((decorador) => (
                      <SelectItem key={decorador} value={decorador}>
                        {decorador}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del Trabajo</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Detalles de la decoración realizada..."
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
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
                {isSubmitting ? "Registrando..." : "Registrar Decoración"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Estadísticas del Día</span>
            </CardTitle>
            <CardDescription>
              Resumen de trabajos de decoración
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary-light/20 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">🎨 Base de Datos</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Con Supabase conectado, los registros se guardarán en la tabla <code>decoraciones</code> 
                automáticamente.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <span className="text-sm font-medium">Decoraciones Hoy</span>
                <span className="text-lg font-bold text-primary">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                <span className="text-sm font-medium">Tiempo Total</span>
                <span className="text-lg font-bold text-accent">6.5h</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Decorador Activo</span>
                <span className="text-sm text-muted-foreground">María González</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Tipos Más Usados</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buttercream</span>
                  <span className="font-medium">40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fondant</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Glaseado</span>
                  <span className="font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Decoracion;