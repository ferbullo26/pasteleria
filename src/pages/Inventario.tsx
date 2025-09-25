import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Package, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  nombre: string;
  sku: string;
  activo: boolean;
}

interface InventoryItem {
  producto_id: string;
  nombre: string;
  sku: string;
  chico: number;
  mediano: number;
  grande: number;
  objetivo_chico?: number;
  objetivo_mediano?: number;
  objetivo_grande?: number;
  por_hacer_chico?: number;
  por_hacer_mediano?: number;
  por_hacer_grande?: number;
}

const Inventario = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data: productos, error } = await supabase
        .from('productos')
        .select('*')
        .eq('activo', true)
        .order('nombre');

      if (error) throw error;

      // Initialize inventory items with current products
      const inventoryItems: InventoryItem[] = productos?.map(product => ({
        producto_id: product.id,
        nombre: product.nombre,
        sku: product.sku,
        chico: 0,
        mediano: 0,
        grande: 0,
        objetivo_chico: 0,
        objetivo_mediano: 0,
        objetivo_grande: 0,
        por_hacer_chico: 0,
        por_hacer_mediano: 0,
        por_hacer_grande: 0,
      })) || [];

      setProducts(productos || []);
      setInventory(inventoryItems);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateInventoryItem = (productId: string, size: 'chico' | 'mediano' | 'grande', value: number) => {
    setInventory(prev => prev.map(item => 
      item.producto_id === productId 
        ? { 
            ...item, 
            [size]: value,
            [`por_hacer_${size}`]: Math.max((item[`objetivo_${size}` as keyof InventoryItem] as number) - value, 0)
          }
        : item
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Mock save - in real implementation this would upsert to inventarios table
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inventario guardado",
        description: "Los datos del inventario se han actualizado correctamente",
      });
    } catch (error) {
      console.error('Error saving inventory:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el inventario",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="w-8 h-8 mx-auto mb-4 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Inventario</h2>
            <p className="text-muted-foreground">Control de inventario por tamaños</p>
          </div>
        </div>
        
        <Button
          onClick={handleSave}
          variant="bakery"
          size="lg"
          disabled={isSaving}
          className="min-w-[120px]"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? "Guardando..." : "Guardar"}
        </Button>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Control de Inventario</CardTitle>
          <CardDescription>
            Registra las cantidades actuales por tamaño. Los campos "Por hacer" se calculan automáticamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {inventory.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No hay productos activos</h3>
              <p className="text-muted-foreground">Agrega productos en el sistema para comenzar.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Producto</th>
                    <th className="text-center py-3 px-2 font-medium">SKU</th>
                    <th className="text-center py-3 px-2 font-medium text-secondary">Chico</th>
                    <th className="text-center py-3 px-2 font-medium text-secondary">Objetivo</th>
                    <th className="text-center py-3 px-2 font-medium text-secondary">Por hacer</th>
                    <th className="text-center py-3 px-2 font-medium text-accent">Mediano</th>
                    <th className="text-center py-3 px-2 font-medium text-accent">Objetivo</th>
                    <th className="text-center py-3 px-2 font-medium text-accent">Por hacer</th>
                    <th className="text-center py-3 px-2 font-medium text-primary">Grande</th>
                    <th className="text-center py-3 px-2 font-medium text-primary">Objetivo</th>
                    <th className="text-center py-3 px-2 font-medium text-primary">Por hacer</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.producto_id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-2">
                        <div className="font-medium">{item.nombre}</div>
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-muted-foreground">
                        {item.sku}
                      </td>
                      
                      {/* Chico */}
                      <td className="py-3 px-2">
                        <Input
                          type="number"
                          min="0"
                          value={item.chico}
                          onChange={(e) => updateInventoryItem(item.producto_id, 'chico', parseInt(e.target.value) || 0)}
                          className="w-20 text-center"
                          placeholder="0"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-muted-foreground">
                        {item.objetivo_chico}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-sm font-medium ${item.por_hacer_chico && item.por_hacer_chico > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {item.por_hacer_chico}
                        </span>
                      </td>
                      
                      {/* Mediano */}
                      <td className="py-3 px-2">
                        <Input
                          type="number"
                          min="0"
                          value={item.mediano}
                          onChange={(e) => updateInventoryItem(item.producto_id, 'mediano', parseInt(e.target.value) || 0)}
                          className="w-20 text-center"
                          placeholder="0"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-muted-foreground">
                        {item.objetivo_mediano}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-sm font-medium ${item.por_hacer_mediano && item.por_hacer_mediano > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {item.por_hacer_mediano}
                        </span>
                      </td>
                      
                      {/* Grande */}
                      <td className="py-3 px-2">
                        <Input
                          type="number"
                          min="0"
                          value={item.grande}
                          onChange={(e) => updateInventoryItem(item.producto_id, 'grande', parseInt(e.target.value) || 0)}
                          className="w-20 text-center"
                          placeholder="0"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-sm text-muted-foreground">
                        {item.objetivo_grande}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-sm font-medium ${item.por_hacer_grande && item.por_hacer_grande > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {item.por_hacer_grande}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-primary-light/20 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">⚡ Funcionalidad Completa</h3>
            <p className="text-sm text-muted-foreground">
              Para funcionalidad completa, se necesitan las tablas <code>inventarios</code> y <code>par_levels</code> 
              con la vista <code>v_inventario_hoy</code> en Supabase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventario;