import { InboxOutlined } from "@ant-design/icons";
import {
  Modal,
  ModalProps,
  Upload,
  UploadProps,
  App,
  Typography,
  Button,
  Flex,
} from "antd";
import React, { useEffect, useState } from "react";
import MemberTable from "./MemberTable";
import { RcFile, UploadFile } from "antd/es/upload";
import memberController from "@/controllers/memberController";
import axiosClient from "@/configs/axiosClient";
import { formatBytes } from "@/utils/formatBytes";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/configs/queryClient";
import { HighlightText } from "../common/styled";
const { Dragger } = Upload;

type Props = ModalProps & {
  handleCancel: () => void;
};

const BulkCreateModal = ({ handleCancel, ...props }: Props) => {
  const { message } = App.useApp();

  const [members, setMembers] = useState<any>();
  const [file, setFile] = useState<UploadFile>();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (uploadSuccess && !props.open) {
      setUploadSuccess(false);
      setMembers(undefined);
      setFile(undefined);
    }
  }, [uploadSuccess, props.open]);

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    customRequest: (options: any) => {
      const data = new FormData();
      data.append("file", options.file);
      memberController
        .upload(data)
        .then((res: any) => {
          options.onSuccess(res.data, options.file);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
    onChange: async (info) => {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setMembers(info.file.response.result);
        setFile(info.file);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleReset = () => {
    setMembers(undefined);
    setFile(undefined);
  };

  const uploadMutation = useMutation({
    mutationKey: ["members", "upload"],
    mutationFn: memberController.bulkCreate,
    onSuccess: async () => {
      message.success(`${members.length} created successfully.`);
      await queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      setUploadSuccess(true);
    },
  });

  const handleUpload = async () => {
    await uploadMutation.mutateAsync({ members });
  };

  const renderBody = () => {
    if (uploadSuccess) {
      return (
        <Flex
          style={{
            marginTop: 32,
          }}
          gap={12}
          vertical
          justify="center"
          align="center"
        >
          <Typography.Title level={3}>
            <HighlightText>
              {`${members?.length} created successfully.`}
            </HighlightText>
          </Typography.Title>
          <div>
            <Button
              size="large"
              onClick={() => {
                handleReset();
                handleCancel();
              }}
            >
              Close
            </Button>
          </div>
        </Flex>
      );
    }

    if (members) {
      return <MemberTable showSearch dataSource={members} />;
    }

    return (
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    );
  };

  return (
    <Modal
      {...props}
      onCancel={handleCancel}
      width={members && !uploadSuccess ? 1200 : 500}
      footer={
        uploadSuccess ? null : (
          <Flex justify="space-between">
            <div>
              {members && (
                <Button type="primary" ghost onClick={handleReset}>
                  Upload another
                </Button>
              )}
            </div>
            <Flex gap={4}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                disabled={!members}
                onClick={handleUpload}
                loading={uploadMutation.isPending}
              >
                Process
              </Button>
            </Flex>
          </Flex>
        )
      }
    >
      <Typography.Title level={3}>Bulk Create Members</Typography.Title>
      {file && !uploadSuccess && (
        <Typography.Title level={5}>
          {file?.name} ({formatBytes(file?.size || 0)})
        </Typography.Title>
      )}
      {renderBody()}
    </Modal>
  );
};

export default BulkCreateModal;
