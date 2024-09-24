import Alert from "../common/Alert";
import SocialMediaItem from "./SocialMediaItem";
import { LuBadgeInfo } from "react-icons/lu";

const SocialMediaList = (props) => {
  const { socialMedias, openModal } = props;
  return (
    <>
      {Array.isArray(socialMedias) && socialMedias.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-4">
          {socialMedias.map((socialMedia) => (
            <SocialMediaItem
              key={socialMedia.id}
              {...socialMedia}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <Alert
          Icon={LuBadgeInfo}
          message={"Tidak ada media sosial yang tersedia."}
          type={"info"}
        />
      )}
    </>
  );
};

export default SocialMediaList;
