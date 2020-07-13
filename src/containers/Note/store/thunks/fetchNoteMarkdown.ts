import { createAsyncThunk } from '@reduxjs/toolkit';
import { featureKey } from '../featureKey';

interface ReturnType {
  noteMarkdown: string;
  noteListMarkdown: string;
}
interface Payload {
  slug: string;
}
interface ThunkApi {
  rejectValue: {
    status: number;
    message: string;
  };
}

export const fetchNoteMarkdown = createAsyncThunk<ReturnType, Payload, ThunkApi>(
  `${featureKey}/fetchNoteMarkdown`,
  async (args, thunkApi) => {
    try {
      const markdowns = (await Promise.all([
        fetch(`notes/${args.slug}.md`),
        fetch(`notes/_notes.md`),
      ]).then((responses) => {
        return responses.map((response) => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        });
      })) as [Promise<string>, Promise<string>];
      return {
        noteMarkdown: await markdowns[0],
        noteListMarkdown: await markdowns[1],
      };
    } catch (e) {
      return thunkApi.rejectWithValue({
        status: -1,
        message: 'noteの取得に失敗しました',
      });
    }
  },
);
