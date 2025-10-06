import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { WelcomeScreen } from "@/routes/WelcomeScreen";
import { HomeScreen } from "@/routes/HomeScreen";
import { SectionEditor } from "@/routes/SectionEditor";
import { PreviewScreen } from "@/routes/PreviewScreen";
import { PublicProfile } from "@/routes/PublicProfile";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<HomeScreen />} />
        <Route path="/sections/:sectionId" element={<SectionEditor />} />
        <Route path="/preview" element={<PreviewScreen />} />
      </Route>
      <Route path="/profile/:slug" element={<PublicProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
