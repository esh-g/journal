import GDrive from "expo-google-drive-api-wrapper";
import { getItemAsync } from "expo-secure-store";

export default class Drive {
  static instance;
  constructor(accessToken, rootFolderName = "Open-Journal-Memories") {
    this.accessToken = accessToken;
    this.rootFolderName = rootFolderName;
    GDrive.setAccessToken(accessToken);
    GDrive.init();
  }
  static async getInstance() {
    if (!Drive.instance) {
      const accessToken = await getItemAsync("accessToken");
      const drive = new Drive(accessToken);
      await drive.init();
      Drive.instance = drive;
    }
    return Drive.instance;
  }
  async init() {
    this.folderId = await this.getRootFolder();
    const files = await this.listRootFiles(this.folderId);
    this.file = files.find(
      (file) => file.name === `${this.rootFolderName}.json`
    );
  }
  async getRootFolder() {
    return await GDrive.files.safeCreateFolder({
      name: this.rootFolderName,
      parents: ["root"],
    });
  }
  async listRootFiles(folderId) {
    return (
      await (await GDrive.files.list({ q: `'${folderId}' in parents` })).json()
    ).files;
  }
  async uploadImage(base64Img, name, imageId) {
    const { id } = await (
      await GDrive.files.createFileMultipart(
        base64Img,
        "'application/vnd.google-apps.photo'",
        { name, parents: [this.folderId], id: imageId },
        true
      )
    ).json();
    await GDrive.permissions.create(id, { role: "reader", type: "anyone" });
  }

  async getImage(name) {
    const files = await this.listRootFiles(this.folderId);
    const file = files.find((file) => file.name === name);
    if (!file) return null;
    return (
      await GDrive.files.get(file.id, { fields: "webContentLink" })
    ).json();
  }

  async deleteImage(name) {
    const files = await this.listRootFiles(this.folderId);
    const file = files.find((file) => file.name === name);
    if (!file) return null;
    await GDrive.files.delete(file.id);
    return true;
  }
}
