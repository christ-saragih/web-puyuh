import TagArtikel from "./TagArtikel";
import KontenArtikel from "./KontenArtikel";
import AdminLayout from "../../../layouts/AdminLayout";
import useArticleTags from "./useArticleTags";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiBookOpenTextFill, PiTagFill } from "react-icons/pi";
import { Tabs } from "flowbite-react";

const AdminArtikel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsRef = useRef(null);

  // Ambil parameter tab dari URL, default ke "tag-artikel"
  const initialTab = searchParams.get("tab") || "tag-artikel";

  // Tentukan state awal berdasarkan parameter tab
  const [activeTab, setActiveTab] = useState(
    initialTab === "konten-artikel" ? 1 : 0
  );

  const { articleTags, fetchArticleTags, addTag, updateTag, deleteTag } =
    useArticleTags();

  // Gunakan useEffect untuk mengubah tab berdasarkan URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "konten-artikel") {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [searchParams]);

  // Handle perubahan tab
  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
    if (newTabIndex === 0) {
      setSearchParams({ tab: "tag-artikel" });
    } else if (newTabIndex === 1) {
      setSearchParams({ tab: "konten-artikel" });
    }
  };

  return (
    <AdminLayout title={"Halaman Managemen Artikel"}>
      <div className="flex flex-col gap-8">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <Tabs
            aria-label="Tabs with underline"
            variant="underline"
            ref={tabsRef}
            onActiveTabChange={handleTabChange}
            activeTab={activeTab} // Tetapkan tab yang aktif berdasarkan state
          >
            <Tabs.Item
              active={activeTab === 0}
              title="Tag Artikel"
              icon={PiTagFill}
            >
              <TagArtikel
                articleTags={articleTags}
                addTag={addTag}
                updateTag={updateTag}
                deleteTag={deleteTag}
                fetchArticleTags={fetchArticleTags}
              />
            </Tabs.Item>

            <Tabs.Item
              active={activeTab === 1}
              title="Konten Artikel"
              icon={PiBookOpenTextFill}
            >
              <KontenArtikel articleTags={articleTags} />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminArtikel;
