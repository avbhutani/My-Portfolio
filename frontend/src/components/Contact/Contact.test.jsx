import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact';
import { socials } from '../../data/content';

vi.mock('axios');

// The toast host lives in App, so mount it alongside the form under test.
const renderContact = () =>
  render(
    <>
      <Contact />
      <ToastContainer autoClose={2000} />
    </>,
  );

const fillValidForm = async (user) => {
  await user.type(screen.getByLabelText(/^name$/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/^email$/i), 'jane@company.com');
  await user.type(screen.getByLabelText(/^message$/i), 'I would like to talk about a role.');
};

describe('Contact form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.post.mockResolvedValue({ status: 200 });
  });

  it('rejects an empty submission without calling the API', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(axios.post).not.toHaveBeenCalled();
    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it('rejects a malformed email address', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/^name$/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^message$/i), 'A message long enough to pass.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(axios.post).not.toHaveBeenCalled();
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it('posts trimmed values and clears the form on success', async () => {
    const user = userEvent.setup();
    renderContact();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    const [url, payload] = axios.post.mock.calls[0];
    expect(url).toMatch(/\/submitForm$/);
    expect(payload).toEqual({
      name: 'Jane Doe',
      email: 'jane@company.com',
      content: 'I would like to talk about a role.',
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/^name$/i)).toHaveValue('');
      expect(screen.getByLabelText(/^email$/i)).toHaveValue('');
      expect(screen.getByLabelText(/^message$/i)).toHaveValue('');
    });
  });

  it('shows a loading state while the request is in flight', async () => {
    let resolvePost;
    axios.post.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePost = resolve;
        }),
    );

    const user = userEvent.setup();
    renderContact();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const submit = await screen.findByRole('button', { name: /sending/i });
    expect(submit).toBeDisabled();

    resolvePost({ status: 200 });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /send message/i })).not.toBeDisabled(),
    );
  });

  it('surfaces a failure message when the request rejects', async () => {
    axios.post.mockRejectedValue({ response: { status: 500 } });
    const user = userEvent.setup();
    renderContact();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/message was not sent/i, {}, { timeout: 4000 }),
    ).toBeInTheDocument();

    // The form must keep the user's input so they can retry.
    expect(screen.getByLabelText(/^name$/i)).toHaveValue('Jane Doe');
  });

  it('reports rate limiting distinctly', async () => {
    axios.post.mockRejectedValue({ response: { status: 429 } });
    const user = userEvent.setup();
    renderContact();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/too many messages/i, {}, { timeout: 4000 }),
    ).toBeInTheDocument();
  });

  it('does not submit when the honeypot field is filled', async () => {
    const user = userEvent.setup();
    renderContact();

    await fillValidForm(user);
    await user.type(screen.getByLabelText(/company/i), 'spam-co');

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('offers a direct email address as a fallback', () => {
    renderContact();
    expect(screen.getByRole('link', { name: socials.email })).toHaveAttribute(
      'href',
      `mailto:${socials.email}`,
    );
  });
});