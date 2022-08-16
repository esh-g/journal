import axios from "axios";

export class DataSheet {
  static instance = null;
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.axios = axios.create({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  static getInstance(accessToken) {
    if (DataSheet.instance != null) return DataSheet.instance;
    DataSheet.instance = new DataSheet(accessToken);
    return DataSheet.instance;
  }
  async getSheetId() {
    const { data: sheetList } = await this.axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        params: {
          q: "'root' in parents and mimeType = 'application/vnd.google-apps.spreadsheet' and name = 'Open-Journal-Memories' and trashed = false",
        },
      }
    );
    let sheet;
    if (sheetList.files.length === 0) {
      sheet = (
        await this.axios.post("https://sheets.googleapis.com/v4/spreadsheets", {
          properties: {
            title: "Open-Journal-Memories",
          },
        })
      ).data;
      await this.axios.put(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheet.spreadsheetId}/values/E1`,
        {
          range: "E1",
          values: [["=SEQUENCE(COUNTA(A1:A))"]],
          majorDimension: "ROWS",
        },
        {
          params: {
            valueInputOption: "USER_ENTERED",
          },
        }
      );
    } else sheet = { spreadsheetId: sheetList.files[0].id };
    return sheet.spreadsheetId;
  }

  async getData(id) {
    const { data } = await this.axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/sheet1!A1:E`,
      {
        params: {
          majorDimension: "ROWS",
          valueRenderOption: "UNFORMATTED_VALUE",
          dateTimeRenderOption: "FORMATTED_STRING",
        },
      }
    );
    if (!data.values || data.values[0][0].length === 0) return [];
    const memories = data.values.map(([title, notes, date, image, id]) => {
      return {
        title,
        notes,
        date,
        id,
        image: image ? { uri: image } : null,
      };
    });
    return memories;
  }

  async createMemory(sheetId, { title, notes, date, image }) {
    const { data: res } = await this.axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/sheet1!A1:append`,
      {
        values: [[title, notes, date, image]],
        majorDimension: "ROWS",
      },
      {
        params: {
          valueInputOption: "USER_ENTERED",
        },
      }
    );
    return res;
  }

  async updateMemory(sheetId, { title, notes, date, image, id }) {
    const { data: res } = await this.axios.put(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/sheet1!A${id}:D${id}`,
      {
        values: [[title, notes, date, image != null ? image.uri : null]],
        majorDimension: "ROWS",
      },
      {
        params: {
          valueInputOption: "USER_ENTERED",
        },
      }
    );
    return res;
  }

  async deleteMemory(sheetId, id) {
    const { data: res } = await this.axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
      {
        requests: [
          {
            deleteRange: {
              shiftDimension: "ROWS",
              range: {
                sheetId: 0,
                startRowIndex: id - 1,
                endRowIndex: id,
                startColumnIndex: 0,
                endColumnIndex: 4,
              },
            },
          },
        ],
      }
    );
    return res;
  }
}
