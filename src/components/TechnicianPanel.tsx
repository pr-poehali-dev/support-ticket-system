import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import TicketCard from "./TicketCard";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "created" | "in_progress" | "problem" | "completed";
  user: string;
  created_date: string;
  technician?: string;
  comments: Array<{
    id: number;
    author: string;
    text: string;
    date: string;
  }>;
  completion_report?: string;
}

const TechnicianPanel = ({ currentUser }: { currentUser: string }) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Назначенные технику заявки
  const [assignedTickets, setAssignedTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Не работает принтер в офисе 205",
      description:
        "Принтер Canon не печатает документы, горит красная лампочка",
      status: "in_progress",
      user: "Иван Петров",
      created_date: "2024-01-15",
      technician: currentUser,
      comments: [
        {
          id: 1,
          author: "Техник Алексей",
          text: "Начал диагностику",
          date: "2024-01-15 10:30",
        },
      ],
    },
    {
      id: 2,
      title: "Проблемы с интернетом",
      description: "Интернет работает медленно, страницы загружаются долго",
      status: "created",
      user: "Мария Сидорова",
      created_date: "2024-01-16",
      technician: currentUser,
      comments: [],
    },
  ]);

  // Все остальные заявки в системе (только для просмотра)
  const [allTickets] = useState<Ticket[]>([
    {
      id: 3,
      title: "Не запускается 1С",
      description: "При запуске 1С выдает ошибку подключения к базе данных",
      status: "problem",
      user: "Дмитрий Козлов",
      created_date: "2024-01-14",
      technician: "Техник Михаил",
      comments: [
        {
          id: 2,
          author: "Техник Михаил",
          text: "Обнаружена проблема с сервером БД",
          date: "2024-01-16 14:20",
        },
      ],
    },
    {
      id: 4,
      title: "Сломался монитор",
      description: "Экран мерцает и периодически выключается",
      status: "completed",
      user: "Анна Васильева",
      created_date: "2024-01-13",
      technician: "Техник Сергей",
      comments: [],
      completion_report: "Заменен кабель питания, монитор работает исправно",
    },
    {
      id: 5,
      title: "Клавиатура не работает",
      description: "Некоторые клавиши не нажимаются",
      status: "created",
      user: "Петр Иванов",
      created_date: "2024-01-17",
      comments: [],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "problem":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "created":
        return "Создана";
      case "in_progress":
        return "В работе";
      case "problem":
        return "Проблема";
      case "completed":
        return "Выполнена";
      default:
        return status;
    }
  };

  const updateTicket = (updatedTicket: Ticket) => {
    setAssignedTickets((tickets) =>
      tickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket,
      ),
    );
  };

  const handleTicketClick = (ticket: Ticket, readOnly = false) => {
    setSelectedTicket(ticket);
    setIsReadOnly(readOnly);
  };

  if (selectedTicket) {
    return (
      <TicketCard
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
        onUpdate={updateTicket}
        currentUser={currentUser}
        readOnly={isReadOnly}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Tool" size={24} className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Панель техника
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="User" size={20} className="text-gray-600" />
            <span className="text-sm text-gray-700">{currentUser}</span>
            <Badge variant="secondary">Техник</Badge>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Назначенные заявки ({assignedTickets.length})
          </h2>
          <p className="text-sm text-gray-600">
            Заявки, которые требуют вашего внимания
          </p>
        </div>

        {/* Список заявок */}
        <div className="space-y-4">
          {assignedTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">
                      #{ticket.id} {ticket.title}
                    </h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusText(ticket.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {ticket.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{ticket.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{ticket.created_date}</span>
                    </div>
                    {ticket.comments.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={12} />
                        <span>{ticket.comments.length} комментариев</span>
                      </div>
                    )}
                  </div>
                </div>

                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-gray-400 ml-4 flex-shrink-0"
                />
              </div>
            </Card>
          ))}
        </div>

        {assignedTickets.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="CheckCircle"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет назначенных заявок
            </h3>
            <p className="text-gray-600">
              Все заявки выполнены! Отличная работа.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianPanel;
