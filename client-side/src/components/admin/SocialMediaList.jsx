import SocialMediaItem from "./SocialMediaItem";

const SocialMediaList = (props) => {
  const { socialMedias, openModal } = props;
  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-4">
      {socialMedias.map((socialMedia) => (
        <SocialMediaItem
          key={socialMedia.id}
          {...socialMedia}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default SocialMediaList;
