import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup API routes for documentation
  const apiRouter = app.route('/api');

  // Get all documentation
  app.get('/api/docs', async (_req, res) => {
    try {
      const docs = await storage.getAllDocs();
      res.json(docs);
    } catch (error) {
      console.error('Error fetching docs:', error);
      res.status(500).json({ message: 'Error fetching documentation' });
    }
  });

  // Get documentation by slug
  app.get('/api/docs/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const doc = await storage.getDocBySlug(slug);
      
      if (!doc) {
        return res.status(404).json({ message: 'Documentation not found' });
      }
      
      res.json(doc);
    } catch (error) {
      console.error('Error fetching doc:', error);
      res.status(500).json({ message: 'Error fetching documentation' });
    }
  });

  // Get documentation by category
  app.get('/api/docs/category/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const docs = await storage.getDocsByCategory(category);
      res.json(docs);
    } catch (error) {
      console.error('Error fetching docs by category:', error);
      res.status(500).json({ message: 'Error fetching documentation' });
    }
  });

  // Search documentation
  app.get('/api/search', async (req, res) => {
    try {
      const querySchema = z.object({
        q: z.string().min(1).default(''),
      });
      
      const query = querySchema.parse(req.query);
      
      if (!query.q) {
        return res.json([]);
      }
      
      const results = await storage.searchDocs(query.q);
      res.json(results);
    } catch (error) {
      console.error('Error searching docs:', error);
      res.status(500).json({ message: 'Error searching documentation' });
    }
  });

  // Get navigation
  app.get('/api/navigation', async (_req, res) => {
    try {
      const navigation = await storage.getNavigation();
      res.json(navigation);
    } catch (error) {
      console.error('Error fetching navigation:', error);
      res.status(500).json({ message: 'Error fetching navigation' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
