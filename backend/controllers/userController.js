import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; 
import generateToken from '../utils/generateToken.js';

dotenv.config();

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      contact: user.contact,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      contact: user.contact,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, address } = req.body;
  const phoneNumber = contact?.phone_no;

  if (!name || name.trim().length < 3) {
    res.status(400);
    throw new Error('Name must contain at least 3 characters');
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400);
    throw new Error('Enter a valid email address');
  }
  if (!password || password.length < 8) {
    res.status(400);
    throw new Error('Password must contain at least 8 characters');
  }
  if (!address || address.trim().length < 5) {
    res.status(400);
    throw new Error('Address must contain at least 5 characters');
  }
  if (!/^\d{10}$/.test(phoneNumber ?? '')) {
    res.status(400);
    throw new Error('Enter a valid 10-digit mobile number');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('You have already been verified');
  } else {
    const user = await User.create({
      name,
      email,
      password,
      contact,
      address,
    });

    if (user) {
      
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        address: user.address,
        contact: user.contact,
      });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  }
});

const emailSend = asyncHandler(async (req, res) => {
  const { receiver, text, name, address, productName, email, phone_no } = req.body;
  const emailUser = process.env.EMAIL_USER ?? process.env.USER1;
  const emailPassword = process.env.EMAIL_PASSWORD ?? process.env.PASSWORD;

  if (!emailUser || !emailPassword) {
    res.status(503);
    throw new Error('Email delivery is not configured');
  }

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: receiver,
    subject: 'You have a buyer',
    html: `<p>A Campus Connect user is interested in ${escapeHtml(productName)}.</p>
    <p>Name: ${escapeHtml(name)}<br/>Address: ${escapeHtml(address)}<br/>
    Email: ${escapeHtml(email)}<br/>Contact: ${escapeHtml(phone_no)}</p>
    <p>Message: ${escapeHtml(text)}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400);
      throw new Error(error);
    } else {
      res.status(201).json({ response: 'Email Successfully Sent' });
    }
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone_no } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    if (req.user._id.toString() === user._id.toString() || req.user.isAdmin) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.address = address || user.address;
      user.password = password || user.password;
      user.contact.phone_no = phone_no || user.contact.phone_no;
      const updatedUser = await user.save();
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        contact: updatedUser.contact,
      });
    } else {
      res.status(401);
      throw new Error('You cannot perform this action');
    }
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (
    (user && user._id.toString() === req.user._id.toString()) ||
    req.user.isAdmin
  ) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  emailSend,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
};
