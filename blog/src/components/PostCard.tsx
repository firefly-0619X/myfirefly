import { Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import type { Post } from '@/data/posts'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full hover-lift border-2 border-transparent hover:border-primary/20 cursor-pointer group">
      <Link to={`/posts/${post.id}`}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 mt-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-muted hover:border-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardFooter>
      </Link>
    </Card>
  )
}
