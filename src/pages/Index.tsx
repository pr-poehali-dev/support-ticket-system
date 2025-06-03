import React, { useState } from "react";
import TechnicianPanel from "@/components/TechnicianPanel";

const Index = () => {
  // Для демонстрации показываем панель техника
  const [currentUser] = useState("Техник Алексей");

  return <TechnicianPanel currentUser={currentUser} />;
};

export default Index;
