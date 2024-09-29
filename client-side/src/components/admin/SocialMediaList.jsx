import Alert from "../common/Alert";
import SocialMediaItem from "./SocialMediaItem";  

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
        <div className="flex justify-center">
          <Alert
            message={"Tidak ada media sosial yang tersedia."}
            type={"info"}
          />
        </div>
      )}
    </>
  );
};

export default SocialMediaList;
