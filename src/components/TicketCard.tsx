import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "created" | "in_progress" | "problem" | "completed";
  user: string;
  created_date: string;
  technician?: string;
  comments: Comment[];
  completion_report?: string;
}

interface TicketCardProps {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (ticket: Ticket) => void;
  currentUser: string;
}

const TicketCard = ({
  ticket,
  onBack,
  onUpdate,
  currentUser,
}: TicketCardProps) => {
  const [newComment, setNewComment] = useState("");
  const [completionReport, setCompletionReport] = useState(
    ticket.completion_report || "",
  );
  const [currentTicket, setCurrentTicket] = useState(ticket);

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

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: currentUser,
      text: newComment,
      date: new Date().toLocaleString("ru-RU"),
    };

    const updatedTicket = {
      ...currentTicket,
      comments: [...currentTicket.comments, comment],
    };

    setCurrentTicket(updatedTicket);
    onUpdate(updatedTicket);
    setNewComment("");
  };

  const updateStatus = (newStatus: string) => {
    const updatedTicket = {
      ...currentTicket,
      status: newStatus as any,
    };

    setCurrentTicket(updatedTicket);
    onUpdate(updatedTicket);
  };

  const completeTicket = () => {
    if (!completionReport.trim()) return;

    const updatedTicket = {
      ...currentTicket,
      status: "completed" as const,
      completion_report: completionReport,
    };

    setCurrentTicket(updatedTicket);
    onUpdate(updatedTicket);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div className="flex items-center space-x-3">
            <Icon name="Ticket" size={20} className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Заявка #{currentTicket.id}
            </h1>
            <Badge className={getStatusColor(currentTicket.status)}>
              {getStatusText(currentTicket.status)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentTicket.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {currentTicket.description}
                  </p>
                </div>

                {currentTicket.completion_report && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Отчет о выполнении
                    </h4>
                    <p className="text-green-800 text-sm">
                      {currentTicket.completion_report}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Комментарии */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Комментарии ({currentTicket.comments.length})
              </h3>

              <div className="space-y-4 mb-6">
                {currentTicket.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Добавить комментарий */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Добавить комментарий..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={addComment} disabled={!newComment.trim()}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Добавить комментарий
                </Button>
              </div>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Информация о заявке */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Информация</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Создатель:</span>
                  <span className="font-medium">{currentTicket.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Дата создания:</span>
                  <span className="font-medium">
                    {currentTicket.created_date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Исполнитель:</span>
                  <span className="font-medium">
                    {currentTicket.technician}
                  </span>
                </div>
              </div>
            </Card>

            {/* Управление статусом */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Управление</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Изменить статус
                  </label>
                  <Select
                    value={currentTicket.status}
                    onValueChange={updateStatus}
                    disabled={currentTicket.status === "completed"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created">Создана</SelectItem>
                      <SelectItem value="in_progress">В работе</SelectItem>
                      <SelectItem value="problem">Проблема</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {currentTicket.status !== "completed" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Отчет о выполнении
                    </label>
                    <Textarea
                      placeholder="Опишите выполненные работы..."
                      value={completionReport}
                      onChange={(e) => setCompletionReport(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button
                      onClick={completeTicket}
                      disabled={!completionReport.trim()}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Завершить заявку
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
