import React, { useState } from 'react';
import { Icon } from '../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';

// Unicons imports - verificados
import {
  UilHome, UilUser, UilSetting, UilSearch, UilPlus, UilMinus,
  UilTimes, UilCheck, UilPen, UilTrashAlt, UilCopy,
  UilImport, UilExport, UilSync, UilFilter, UilEye, UilLock,
  UilEnvelope, UilComment, UilBell, UilMicrophone,
  UilPlay, UilPause, UilCamera, UilMusic,
  UilApps, UilListUl, UilLayers, UilBox,
  UilChart, UilBriefcaseAlt, UilBuilding, UilCreditCard, UilShoppingCart,
  UilRocket, UilBug, UilDatabase, UilCloud,
  UilLaptop, UilWifi, UilUsersAlt, UilCalendarAlt, UilClock,
  UilFolder, UilFile, UilStar, UilHeart, UilMapMarker,
  UilArrowRight, UilArrowLeft, UilArrowUp, UilArrowDown,
  UilAngleRight, UilAngleLeft, UilSignOutAlt,
} from '@iconscout/react-unicons';

// Iconoir imports - verificados
import {
  Home as IconoirHome, User as IconoirUser, Settings as IconoirSettings,
  Search as IconoirSearch, Plus as IconoirPlus, Minus as IconoirMinus,
  Xmark as IconoirXmark, Check as IconoirCheck, EditPencil as IconoirPencil,
  Trash as IconoirTrash, Copy as IconoirCopy,
  Download as IconoirDownload, Upload as IconoirUpload, Refresh as IconoirRefresh,
  Filter as IconoirFilter, Eye as IconoirEye, Lock as IconoirLock,
  Mail as IconoirMail, ChatBubble as IconoirComment, Bell as IconoirBell,
  Microphone as IconoirMic, Play as IconoirPlay, Pause as IconoirPause,
  Camera as IconoirCamera, MusicDoubleNote as IconoirMusic,
  AppWindow as IconoirApps, List as IconoirList,
  Box as IconoirBox, GraphUp as IconoirChart,
  Suitcase as IconoirBriefcase, Building as IconoirBuilding,
  CreditCard as IconoirCreditCard, Cart as IconoirCart, Rocket as IconoirRocket,
  Bug as IconoirBug, Database as IconoirDatabase, Cloud as IconoirCloud,
  Laptop as IconoirLaptop, Wifi as IconoirWifi,
  Group as IconoirUsers,
  Calendar as IconoirCalendar, Clock as IconoirClock,
  Folder as IconoirFolder, Page as IconoirFile,
  Heart as IconoirHeart, MapPin as IconoirMapPin,
  ArrowRight as IconoirArrowRight, ArrowLeft as IconoirArrowLeft,
  ArrowUp as IconoirArrowUp, ArrowDown as IconoirArrowDown,
  NavArrowRight as IconoirAngleRight, NavArrowLeft as IconoirAngleLeft,
  LogOut as IconoirLogout,
} from 'iconoir-react';

interface CompareItem {
  name: string;
  UnIcon: React.ComponentType<{ size?: number; className?: string }>;
  Iconoir: React.ComponentType<{ width?: number; height?: number; className?: string }>;
}

const iconComparison: { category: string; items: CompareItem[] }[] = [
  { category: 'Navegacao', items: [
    { name: 'home', UnIcon: UilHome, Iconoir: IconoirHome },
    { name: 'apps', UnIcon: UilApps, Iconoir: IconoirApps },
    { name: 'arrow-right', UnIcon: UilArrowRight, Iconoir: IconoirArrowRight },
    { name: 'arrow-left', UnIcon: UilArrowLeft, Iconoir: IconoirArrowLeft },
    { name: 'arrow-small-up', UnIcon: UilArrowUp, Iconoir: IconoirArrowUp },
    { name: 'arrow-small-down', UnIcon: UilArrowDown, Iconoir: IconoirArrowDown },
    { name: 'angle-small-right', UnIcon: UilAngleRight, Iconoir: IconoirAngleRight },
    { name: 'angle-small-left', UnIcon: UilAngleLeft, Iconoir: IconoirAngleLeft },
    { name: 'sign-out-alt', UnIcon: UilSignOutAlt, Iconoir: IconoirLogout },
  ]},
  { category: 'Acoes', items: [
    { name: 'search', UnIcon: UilSearch, Iconoir: IconoirSearch },
    { name: 'plus', UnIcon: UilPlus, Iconoir: IconoirPlus },
    { name: 'minus', UnIcon: UilMinus, Iconoir: IconoirMinus },
    { name: 'cross', UnIcon: UilTimes, Iconoir: IconoirXmark },
    { name: 'check', UnIcon: UilCheck, Iconoir: IconoirCheck },
    { name: 'pencil', UnIcon: UilPen, Iconoir: IconoirPencil },
    { name: 'trash', UnIcon: UilTrashAlt, Iconoir: IconoirTrash },
    { name: 'copy', UnIcon: UilCopy, Iconoir: IconoirCopy },
    { name: 'download', UnIcon: UilImport, Iconoir: IconoirDownload },
    { name: 'upload', UnIcon: UilExport, Iconoir: IconoirUpload },
    { name: 'refresh', UnIcon: UilSync, Iconoir: IconoirRefresh },
    { name: 'filter', UnIcon: UilFilter, Iconoir: IconoirFilter },
    { name: 'eye', UnIcon: UilEye, Iconoir: IconoirEye },
    { name: 'lock', UnIcon: UilLock, Iconoir: IconoirLock },
  ]},
  { category: 'Comunicacao', items: [
    { name: 'envelope', UnIcon: UilEnvelope, Iconoir: IconoirMail },
    { name: 'comment-alt', UnIcon: UilComment, Iconoir: IconoirComment },
    { name: 'bell', UnIcon: UilBell, Iconoir: IconoirBell },
    { name: 'microphone', UnIcon: UilMicrophone, Iconoir: IconoirMic },
    { name: 'play', UnIcon: UilPlay, Iconoir: IconoirPlay },
    { name: 'pause', UnIcon: UilPause, Iconoir: IconoirPause },
    { name: 'camera', UnIcon: UilCamera, Iconoir: IconoirCamera },
    { name: 'music', UnIcon: UilMusic, Iconoir: IconoirMusic },
  ]},
  { category: 'Interface', items: [
    { name: 'list', UnIcon: UilListUl, Iconoir: IconoirList },
    { name: 'box', UnIcon: UilBox, Iconoir: IconoirBox },
  ]},
  { category: 'Negocios', items: [
    { name: 'chart-histogram', UnIcon: UilChart, Iconoir: IconoirChart },
    { name: 'briefcase', UnIcon: UilBriefcaseAlt, Iconoir: IconoirBriefcase },
    { name: 'building', UnIcon: UilBuilding, Iconoir: IconoirBuilding },
    { name: 'credit-card', UnIcon: UilCreditCard, Iconoir: IconoirCreditCard },
    { name: 'shopping-cart', UnIcon: UilShoppingCart, Iconoir: IconoirCart },
    { name: 'rocket', UnIcon: UilRocket, Iconoir: IconoirRocket },
  ]},
  { category: 'Tech', items: [
    { name: 'bug', UnIcon: UilBug, Iconoir: IconoirBug },
    { name: 'database', UnIcon: UilDatabase, Iconoir: IconoirDatabase },
    { name: 'cloud', UnIcon: UilCloud, Iconoir: IconoirCloud },
    { name: 'laptop', UnIcon: UilLaptop, Iconoir: IconoirLaptop },
    { name: 'wifi', UnIcon: UilWifi, Iconoir: IconoirWifi },
  ]},
  { category: 'Usuarios', items: [
    { name: 'user', UnIcon: UilUser, Iconoir: IconoirUser },
    { name: 'users-alt', UnIcon: UilUsersAlt, Iconoir: IconoirUsers },
  ]},
  { category: 'Geral', items: [
    { name: 'calendar', UnIcon: UilCalendarAlt, Iconoir: IconoirCalendar },
    { name: 'clock', UnIcon: UilClock, Iconoir: IconoirClock },
    { name: 'folder', UnIcon: UilFolder, Iconoir: IconoirFolder },
    { name: 'document', UnIcon: UilFile, Iconoir: IconoirFile },
    { name: 'star', UnIcon: UilStar, Iconoir: IconoirHeart },
    { name: 'heart', UnIcon: UilHeart, Iconoir: IconoirHeart },
    { name: 'map-marker', UnIcon: UilMapMarker, Iconoir: IconoirMapPin },
    { name: 'settings', UnIcon: UilSetting, Iconoir: IconoirSettings },
  ]},
];

const IconCompareSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [iconSize, setIconSize] = useState(24);

  const filteredComparison = iconComparison.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const totalIcons = iconComparison.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-4xl font-serif font-light">Comparacao de Icones</h2>
          <Badge variant="outline" className="text-xs">Lab</Badge>
        </div>
        <p className="font-serif text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Compare lado a lado 3 bibliotecas de icones para decidir qual adotar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500" /> UIcons (Atual)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Icon font via CSS</p>
            <div className="flex gap-1 flex-wrap mt-2">
              <Badge variant="secondary" className="text-[9px]">~4.000 icones</Badge>
              <Badge variant="outline" className="text-[9px] text-orange-500 border-orange-500">No tree-shaking</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-green-500" /> Unicons
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>React SVG components</p>
            <div className="flex gap-1 flex-wrap mt-2">
              <Badge variant="secondary" className="text-[9px]">~1.200 icones</Badge>
              <Badge variant="outline" className="text-[9px] text-green-500 border-green-500">Tree-shaking</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-purple-500" /> Iconoir
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>React SVG minimal</p>
            <div className="flex gap-1 flex-wrap mt-2">
              <Badge variant="secondary" className="text-[9px]">~1.500 icones</Badge>
              <Badge variant="outline" className="text-[9px] text-purple-500 border-purple-500">Tree-shaking</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div className="relative w-full md:w-64">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
          <Input placeholder="Pesquisar..." className="pl-10 h-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Tamanho:</span>
          <div className="flex gap-2">
            {[16, 20, 24, 32].map(size => (
              <button key={size} onClick={() => setIconSize(size)} className={`px-3 py-1 text-sm rounded-md transition-colors ${iconSize === size ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>{size}</button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-12">
        {filteredComparison.map(({ category, items }) => (
          <section key={category} className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(({ name, UnIcon, Iconoir }) => (
                <Card key={name} className="p-4 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground text-center truncate">{name}</span>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20" style={{ width: iconSize + 16, height: iconSize + 16 }}>
                          <Icon name={name} className="text-blue-500" style={{ fontSize: iconSize }} />
                        </div>
                        <span className="text-[7px] text-blue-500 font-medium">UIcons</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20" style={{ width: iconSize + 16, height: iconSize + 16 }}>
                          <UnIcon size={iconSize} className="text-green-500" />
                        </div>
                        <span className="text-[7px] text-green-500 font-medium">Unicons</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20" style={{ width: iconSize + 16, height: iconSize + 16 }}>
                          <Iconoir width={iconSize} height={iconSize} className="text-purple-500" />
                        </div>
                        <span className="text-[7px] text-purple-500 font-medium">Iconoir</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Separator />

      <section className="space-y-8">
        <h3 className="text-2xl font-sans font-semibold">Analise Completa</h3>

        <Card>
          <CardHeader><CardTitle className="text-lg">Metricas</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Metrica</th>
                  <th className="text-center py-3 px-2 text-blue-500">UIcons</th>
                  <th className="text-center py-3 px-2 text-green-500">Unicons</th>
                  <th className="text-center py-3 px-2 text-purple-500">Iconoir</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-2">Bundle (50 icones)</td>
                  <td className="text-center py-3 px-2 text-blue-500">~50kb</td>
                  <td className="text-center py-3 px-2 text-green-500">~8kb</td>
                  <td className="text-center py-3 px-2 text-purple-500">~6kb</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Total Icones</td>
                  <td className="text-center py-3 px-2">~4.000</td>
                  <td className="text-center py-3 px-2">~1.200</td>
                  <td className="text-center py-3 px-2">~1.500</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Tree-shaking</td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-orange-500 border-orange-500">Nao</Badge></td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-green-500 border-green-500">Sim</Badge></td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-green-500 border-green-500">Sim</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 px-2">TypeScript</td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-orange-500 border-orange-500">Parcial</Badge></td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-green-500 border-green-500">Completo</Badge></td>
                  <td className="text-center py-3 px-2"><Badge variant="outline" className="text-green-500 border-green-500">Completo</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Estilo</td>
                  <td className="text-center py-3 px-2">Rounded</td>
                  <td className="text-center py-3 px-2">Rounded</td>
                  <td className="text-center py-3 px-2">Minimal</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="exclamation" className="text-amber-500" />
              Retrabalho para Migracao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold text-blue-500">~100</div>
                <div className="text-xs text-muted-foreground">Icones em uso</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold text-amber-500">4</div>
                <div className="text-xs text-muted-foreground">Arquivos Lucide</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Componente Icon</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-2xl font-bold">{totalIcons}</div>
                <div className="text-xs text-muted-foreground">Mapeados</div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { n: 1, title: 'Atualizar componente Icon', desc: 'Trocar font para SVG', impact: 'Baixo - 1 arquivo' },
                { n: 2, title: 'Criar mapeamento de nomes', desc: 'Adapter para nova lib', impact: 'Medio - types + mapping' },
                { n: 3, title: 'Migrar Lucide restante', desc: '4 arquivos arena/', impact: 'Baixo - substituicao' },
                { n: 4, title: 'Remover deps antigas', desc: 'lucide-react + UIcons CSS', impact: 'Positivo - bundle' },
                { n: 5, title: 'Testes visuais', desc: 'QA em todas paginas', impact: 'Medio - manual' },
              ].map(t => (
                <div key={t.n} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Badge className="mt-0.5">{t.n}</Badge>
                  <div>
                    <div className="font-medium text-sm">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.desc}</div>
                    <div className="text-xs text-amber-500 mt-1">Impacto: {t.impact}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-purple-500/30">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">Iconoir</div>
                  <div className="text-2xl font-bold mt-2">2-3h</div>
                  <div className="text-xs text-muted-foreground mt-1">Minimalista, clean</div>
                </div>
              </Card>
              <Card className="p-4 border-green-500/30">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">Unicons</div>
                  <div className="text-2xl font-bold mt-2">2-3h</div>
                  <div className="text-xs text-muted-foreground mt-1">Similar ao atual</div>
                </div>
              </Card>
              <Card className="p-4 border-muted">
                <div className="text-center">
                  <div className="text-lg font-bold text-muted-foreground">Manter</div>
                  <div className="text-2xl font-bold mt-2">0h</div>
                  <div className="text-xs text-muted-foreground mt-1">Sem beneficios</div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="star" className="text-primary" /> Recomendacao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-sm bg-purple-500" />
                  <span className="font-semibold text-purple-500">Iconoir</span>
                  <Badge variant="outline" className="text-[10px]">Minimalismo</Badge>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>+ Visual clean europeu</li>
                  <li>+ Menor bundle</li>
                  <li>+ Projeto ativo</li>
                  <li>- Menos icones</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-sm bg-green-500" />
                  <span className="font-semibold text-green-500">Unicons</span>
                  <Badge variant="outline" className="text-[10px]">Compatibilidade</Badge>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>+ Similar ao atual</li>
                  <li>+ Transicao suave</li>
                  <li>+ Mais icones</li>
                  <li>- Menos diferenciado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default IconCompareSection;
