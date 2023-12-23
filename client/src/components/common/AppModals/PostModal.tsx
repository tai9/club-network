import queryClient from "@/configs/queryClient";
import postController from "@/controllers/postController";
import useClubNetwork from "@/hooks/useClubNetwork";
import { useMutation } from "@tanstack/react-query";
import { App, Input, Modal } from "antd";

const PostModal = () => {
  const { openPostModal, setOpenPostModal, postContent, setPostContent, post } =
    useClubNetwork();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: postController.create,
    onSuccess: () => {
      message.success("Your post is up! 🚀");
      queryClient.invalidateQueries({ queryKey: ["posts-infinity"] });
    },
  });

  const onCancel = () => {
    setOpenPostModal(false);
  };

  const onSubmit = async () => {
    try {
      // edit mode
      if (post && postContent) {
        await postController.update(post.id, {
          content: postContent,
        });
        message.success("Your post is updated!");
      } else {
        await mutation.mutateAsync({
          content: postContent,
        });
      }

      setOpenPostModal(false);
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  return (
    <Modal open={openPostModal} onOk={onSubmit} onCancel={onCancel}>
      <Input.TextArea
        rows={5}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
    </Modal>
  );
};

export default PostModal;
