import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Camera, Upload, Image } from 'lucide-react';

const Merma = () => {
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: '',
    motivo: '',
    descripcion: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const motivosMerma = [
    'Rotura durante transporte',
    'Sobrecocción',
    'Defecto en decoración',
    'Caducidad',
    'Contaminación',
    'Error en producción',
    'Daño por manipulación',
    'Otros'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Archivo no válido",
          description: "Por favor selecciona una imagen (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Foto requerida",
        description: "Es obligatorio subir una foto de la merma",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock submission - replace with Supabase insert + file upload when connected
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Merma registrada",
        description: `${formData.cantidad} unidades de ${formData.producto} registradas como merma`,
      });

      // Reset form
      setFormData({
        producto: '',
        cantidad: '',
        motivo: '',
        descripcion: ''
      });
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar la merma",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center shadow-soft">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Control de Merma</h2>
          <p className="text-muted-foreground">Registro de productos con pérdida</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Registrar Merma</span>
            </CardTitle>
            <CardDescription>
              Documenta productos con pérdida (foto obligatoria)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="producto">Producto</Label>
                  <Input
                    id="producto"
                    placeholder="Torta de Vainilla"
                    value={formData.producto}
                    onChange={(e) => setFormData(prev => ({ ...prev, producto: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    placeholder="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData(prev => ({ ...prev, cantidad: e.target.value }))}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo de la Merma</Label>
                <Select 
                  value={formData.motivo} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, motivo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {motivosMerma.map((motivo) => (
                      <SelectItem key={motivo} value={motivo}>
                        {motivo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción Detallada</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe el problema encontrado..."
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto" className="text-destructive font-medium">
                  Foto de la Merma * (Obligatoria)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  {preview ? (
                    <div className="space-y-2">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full max-h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreview(null);
                        }}
                      >
                        Cambiar foto
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Haz clic para subir una foto
                      </p>
                      <Input
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="destructive"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Merma"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Información del Sistema</span>
            </CardTitle>
            <CardDescription>
              Almacenamiento y registro de mermas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h3 className="font-semibold text-foreground mb-2">📸 Almacenamiento</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Con Supabase conectado, las fotos se subirán automáticamente al bucket 
                <code className="mx-1 px-1 py-0.5 bg-muted rounded">fotos/mermas</code> 
                y los registros se guardarán en la tabla <code>mermas</code>.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg">
                <span className="text-sm font-medium">Mermas Hoy</span>
                <span className="text-lg font-bold text-destructive">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                <span className="text-sm font-medium">Valor Perdido</span>
                <span className="text-lg font-bold text-secondary">$245</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">Motivo Principal</span>
                <span className="text-sm text-muted-foreground">Rotura</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Últimas Mermas</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Torta Chocolate</span>
                  <span className="text-destructive font-medium">1 unidad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cupcakes</span>
                  <span className="text-destructive font-medium">6 unidades</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pan Dulce</span>
                  <span className="text-destructive font-medium">2 unidades</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Merma;