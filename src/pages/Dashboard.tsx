import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Package, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with Supabase query when connected
  const todaySummary = {
    ventas: 15420,
    productos: 156,
    mermas: 3,
    pendientes: 8
  };

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend 
  }: { 
    title: string; 
    value: string | number; 
    description: string; 
    icon: any; 
    trend?: string; 
  }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
          {trend && <span className="text-accent font-medium ml-1">{trend}</span>}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Resumen de actividades del día</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ventas Hoy"
          value={`$${todaySummary.ventas.toLocaleString()}`}
          description="Total del día"
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          title="Productos"
          value={todaySummary.productos}
          description="Unidades producidas"
          icon={Package}
          trend="+5.2%"
        />
        <StatCard
          title="Mermas"
          value={todaySummary.mermas}
          description="Productos con pérdida"
          icon={AlertCircle}
        />
        <StatCard
          title="Pendientes"
          value={todaySummary.pendientes}
          description="Pedidos por entregar"
          icon={TrendingUp}
        />
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-xl">Información del Sistema</CardTitle>
          <CardDescription>
            Estado actual de la conectividad con Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/20 rounded-lg border border-secondary">
            <h3 className="font-semibold text-foreground mb-2">⚠️ Conectar Supabase</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Para acceder a los datos reales (vista v_resumen_hoy) y habilitar todas las funcionalidades, 
              es necesario conectar este proyecto con Supabase.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>• Dashboard: Leerá vista <code>v_resumen_hoy</code></p>
              <p>• Producción: Insertará en tabla <code>lotes_produccion</code></p>
              <p>• Decoración: Insertará en tabla <code>decoraciones</code></p>
              <p>• Merma: Insertará en tabla <code>mermas</code> con fotos en bucket <code>fotos/mermas</code></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;