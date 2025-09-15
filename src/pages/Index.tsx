import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [userType, setUserType] = useState<'hr' | 'participant' | 'admin' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [participants] = useState([
    { id: 'P001', name: 'Иванов И.И.', birthDate: '1990-05-15', interviewScore: 85, simulatorResults: { typing: 'хороший', spatial: 'средний', reaction: 'хороший' }, stressTest: 'прошел', ranking: 1 },
    { id: 'P002', name: 'Петрова А.С.', birthDate: '1992-08-22', interviewScore: 78, simulatorResults: { typing: 'средний', spatial: 'хороший', reaction: 'средний' }, stressTest: 'прошел', ranking: 2 },
    { id: 'P003', name: 'Сидоров М.В.', birthDate: '1988-12-03', interviewScore: 72, simulatorResults: { typing: 'ниже среднего', spatial: 'средний', reaction: 'хороший' }, stressTest: 'не прошел', ranking: 3 }
  ]);

  const handleLogin = (type: 'hr' | 'participant' | 'admin') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserType(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-900">HR Management System</CardTitle>
            <p className="text-gray-600">Система управления персоналом</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button 
                onClick={() => handleLogin('hr')} 
                className="w-full bg-blue-800 hover:bg-blue-900 text-white"
              >
                <Icon name="Users" className="mr-2" size={18} />
                Вход для кадровика
              </Button>
              <Button 
                onClick={() => handleLogin('participant')} 
                variant="outline" 
                className="w-full border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                <Icon name="User" className="mr-2" size={18} />
                Вход для участника
              </Button>
              <Button 
                onClick={() => handleLogin('admin')} 
                variant="outline" 
                className="w-full border-gray-600 text-gray-600 hover:bg-gray-50"
              >
                <Icon name="Settings" className="mr-2" size={18} />
                Вход для администратора
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userType === 'hr') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Icon name="Users" size={24} className="text-blue-800" />
                <h1 className="text-xl font-semibold text-gray-900">Панель кадровика</h1>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <Icon name="LogOut" className="mr-2" size={16} />
                Выход
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Главная</TabsTrigger>
              <TabsTrigger value="new-participant">Новый участник</TabsTrigger>
              <TabsTrigger value="interview">Интервью</TabsTrigger>
              <TabsTrigger value="results">Результаты</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={20} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Всего участников</p>
                        <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={20} className="text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Прошли стресс-тест</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {participants.filter(p => p.stressTest === 'прошел').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="BarChart" size={20} className="text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Средний балл</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.round(participants.reduce((sum, p) => sum + p.interviewScore, 0) / participants.length)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={20} className="text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Активных сессий</p>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Список участников</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Код</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Балл интервью</TableHead>
                        <TableHead>Стресс-тест</TableHead>
                        <TableHead>Рейтинг</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{participant.id}</TableCell>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>{participant.interviewScore}</TableCell>
                          <TableCell>
                            <Badge variant={participant.stressTest === 'прошел' ? 'default' : 'destructive'}>
                              {participant.stressTest}
                            </Badge>
                          </TableCell>
                          <TableCell>#{participant.ranking}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" size={14} className="mr-1" />
                              Просмотр
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new-participant" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Регистрация нового участника</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">ФИО *</Label>
                      <Input id="fullName" placeholder="Введите полное имя" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Дата рождения *</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Кодовый номер *</Label>
                      <Input id="code" placeholder="Автоматически генерируется" value="P004" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="info1">Информация 1</Label>
                      <Input id="info1" placeholder="Дополнительная информация" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="info2">Информация 2</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите вариант" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Вариант 1</SelectItem>
                          <SelectItem value="option2">Вариант 2</SelectItem>
                          <SelectItem value="option3">Вариант 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="info3">Информация 3</Label>
                      <Textarea id="info3" placeholder="Комментарии" />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">
                    <Icon name="UserPlus" className="mr-2" size={18} />
                    Зарегистрировать участника
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Проведение интервью</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Выберите участника</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите участника для интервью" />
                      </SelectTrigger>
                      <SelectContent>
                        {participants.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.id} - {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold">Вопрос 1: Как вы справляетесь со стрессовыми ситуациями?</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="0" id="q1_0" />
                        <Label htmlFor="q1_0">Избегаю стрессовых ситуаций (0 баллов)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="1" id="q1_1" />
                        <Label htmlFor="q1_1">Справляюсь с трудом (1 балл)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="2" id="q1_2" />
                        <Label htmlFor="q1_2">Справляюсь удовлетворительно (2 балла)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q1" value="3" id="q1_3" />
                        <Label htmlFor="q1_3">Справляюсь хорошо (3 балла)</Label>
                      </div>
                    </div>
                    <Textarea placeholder="Комментарий кадровика..." />
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold">Вопрос 2: Опишите ваш опыт работы в команде</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="0" id="q2_0" />
                        <Label htmlFor="q2_0">Предпочитаю работать один (0 баллов)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="1" id="q2_1" />
                        <Label htmlFor="q2_1">Работаю в команде при необходимости (1 балл)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="2" id="q2_2" />
                        <Label htmlFor="q2_2">Хорошо работаю в команде (2 балла)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="q2" value="3" id="q2_3" />
                        <Label htmlFor="q2_3">Отлично работаю в команде, лидерские качества (3 балла)</Label>
                      </div>
                    </div>
                    <Textarea placeholder="Комментарий кадровика..." />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-gray-600">Текущий балл: 0 из 6</p>
                    <Button className="bg-blue-800 hover:bg-blue-900">
                      <Icon name="Save" className="mr-2" size={18} />
                      Сохранить результаты
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Результаты и отчеты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Выберите участника</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите участника для просмотра результатов" />
                      </SelectTrigger>
                      <SelectContent>
                        {participants.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.id} - {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Результаты симуляторов</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Владение клавиатурой:</span>
                          <Badge>хороший</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Пространственное мышление:</span>
                          <Badge variant="secondary">средний</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Скорость реакции:</span>
                          <Badge>хороший</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Оценки интервью</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Общий балл:</span>
                          <span className="font-semibold">85/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Стресс-тест:</span>
                          <Badge>прошел</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Рейтинг:</span>
                          <span className="font-semibold">#1</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="bg-blue-800 hover:bg-blue-900">
                      <Icon name="Printer" className="mr-2" size={18} />
                      Печать отчета
                    </Button>
                    <Button variant="outline">
                      <Icon name="FileText" className="mr-2" size={18} />
                      Внести результаты стресс-теста
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (userType === 'participant') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Icon name="User" size={24} className="text-blue-800" />
                <h1 className="text-xl font-semibold text-gray-900">Портал участника</h1>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <Icon name="LogOut" className="mr-2" size={16} />
                Выход
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Добро пожаловать в систему тестирования</CardTitle>
              <p className="text-gray-600">Введите ваш код для начала прохождения тестов</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="participantCode">Код участника</Label>
                <Input id="participantCode" placeholder="Введите ваш код (например: P001)" className="text-center text-lg" />
              </div>
              
              <Button className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-3">
                <Icon name="Play" className="mr-2" size={20} />
                Начать тестирование
              </Button>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Этапы тестирования:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-800 font-semibold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Тест скорости печати</p>
                      <p className="text-sm text-gray-600">Оценка владения клавиатурой</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Пространственное мышление</p>
                      <p className="text-sm text-gray-600">Ориентирование в пространстве</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Тест скорости реакции</p>
                      <p className="text-sm text-gray-600">Зрительная и моторная реакция</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (userType === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Icon name="Settings" size={24} className="text-blue-800" />
                <h1 className="text-xl font-semibold text-gray-900">Панель администратора</h1>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <Icon name="LogOut" className="mr-2" size={16} />
                Выход
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="FileEdit" size={20} />
                  <span>Управление вопросами</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить вопрос анкеты
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Edit" className="mr-2" size={16} />
                  Редактировать вопросы интервью
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="BarChart" className="mr-2" size={16} />
                  Настроить балльную шкалу
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Database" size={20} />
                  <span>База данных</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Eye" className="mr-2" size={16} />
                  Просмотр БД
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" className="mr-2" size={16} />
                  Экспорт данных
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Merge" className="mr-2" size={16} />
                  Объединить базы
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Filter" size={20} />
                  <span>Аналитика</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Search" className="mr-2" size={16} />
                  Сравнение участников
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Sliders" className="mr-2" size={16} />
                  Настройка весов
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Printer" className="mr-2" size={16} />
                  Печать отчетов
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Статистика системы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{participants.length}</p>
                  <p className="text-sm text-gray-600">Всего участников</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">15</p>
                  <p className="text-sm text-gray-600">Вопросов в анкете</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600">Активных симулятора</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">2</p>
                  <p className="text-sm text-gray-600">Подключенных БД</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;