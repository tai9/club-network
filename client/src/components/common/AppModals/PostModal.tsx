import postController from "@/controllers/postController";
import useClubNetwork from "@/hooks/useClubNetwork";
import usePosts from "@/hooks/usePosts";
import { Input, Modal, App } from "antd";
import React, { useState } from "react";

const PostModal = () => {
  const { openPostModal, setOpenPostModal, postContent, setPostContent, post } =
    useClubNetwork();
  const { refetch } = usePosts();
  const { message } = App.useApp();

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
        await postController.create({
          content: postContent,
        });
        message.success("Your post is up! 🚀");
      }

      setOpenPostModal(false);
      await refetch();
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
